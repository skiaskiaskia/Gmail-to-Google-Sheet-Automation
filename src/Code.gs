/****************************************
 * FETCH NON-EPHEMERAL INTERAC EMAILS
 *
 * This function retrieves threads from Gmail 
 * matching certain criteria (e.g., from Interac),
 * then appends new messages to "Sheet1" 
 * WITHOUT ever removing previously written rows.
 * 
 * Once a message is appended, it stays in 
 * the sheet permanently.
 ****************************************/
function fetchInteracEmailsToSheet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");

  /*******************************************************
   * 1) Read existing message IDs from Sheet1 (Column A)
   *    so we don't insert duplicates each time we run.
   ********************************************************/
  const lastRow = sheet.getLastRow();
  const existingIds =
    lastRow > 1
      ? sheet.getRange(2, 1, lastRow - 1, 1).getValues().flat()
      : [];

  /********************************************************
   * 2) Define our search query to filter relevant emails.
   *    Example:
   *      - from:notify@payments.interac.ca    (Interac)
   *      - in:inbox                           (Inbox only)
   *      - is:important                       (Flagged as important)
   *      - -subject:"to SIAMAK KIANI"         (Exclude certain subject)
   *      - newer_than:21d                    (Within last 3 weeks)
   ********************************************************/
  const query = 
    "from:notify@payments.interac.ca in:inbox is:important -subject:'to SIAMAK KIANI' newer_than:21d";

  /********************************************************
   * 3) We fetch threads in batches to avoid time limits.
   *    For each batch of 20 threads, we process them.
   ********************************************************/
  const batchSize = 20;
  let startIndex = 0;
  let hasMoreEmails = true;

  while (hasMoreEmails) {
    // Fetch a batch of threads based on our query
    const threads = GmailApp.search(query, startIndex, batchSize);
    
    if (threads.length === 0) {
      hasMoreEmails = false; // No more matching threads
    } else {
      /*******************************************************
       * 4) For each thread, retrieve the individual messages
       *    and append any new ones to Sheet1.
       *******************************************************/
      threads.forEach(thread => {
        const messages = thread.getMessages();
        messages.forEach(message => {
          const messageId = message.getId();

          // Skip if we've already stored this message ID
          if (existingIds.includes(messageId)) {
            return;
          }

          // Gather info
          const subject  = message.getSubject()     || "";
          const from     = message.getFrom()        || "";
          const replyTo  = message.getReplyTo()     || "";
          const date     = message.getDate()        || "";
          const snippet  = (message.getPlainBody()  || "").substring(0, 100);

          // Append a new row with this message's details
          sheet.appendRow([
            messageId,   // Column A: unique Gmail message ID
            subject,     // Column B: subject
            from,        // Column C: from address
            replyTo,     // Column D: reply-to address
            date,        // Column E: date
            snippet,     // Column F: snippet (first 100 chars)
            "",          // Column G: placeholder for "Assigned"
            "Pending"    // Column H: placeholder for "Status"
          ]);

          // Add this ID to our local array to avoid duplicates
          existingIds.push(messageId);
        });
      });

      // Increase startIndex to move to next batch of threads
      startIndex += batchSize;
    }
  }
}
