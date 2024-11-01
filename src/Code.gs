function fetchInteracEmailsToSheet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");

  // Check if the sheet is empty by looking at the last row
  const lastRow = sheet.getLastRow();
  const existingIds = lastRow > 1 
    ? sheet.getRange(2, 1, lastRow - 1, 1).getValues().flat() 
    : []; // If the sheet is empty, start with an empty array for IDs
  
  const batchSize = 20; // Number of threads per batch to avoid time limits
  let startIndex = 0;
  let hasMoreEmails = true;

  while (hasMoreEmails) {
    const threads = GmailApp.search("from:notify@payments.interac.ca", startIndex, batchSize); // Fetch batch of threads

    if (threads.length === 0) {
      hasMoreEmails = false; // Stop if no more threads are found
    } else {
      threads.forEach(thread => {
        const messages = thread.getMessages();
        messages.forEach(message => {
          const messageId = message.getId();

          if (!existingIds.includes(messageId)) { // Check if the message ID is already in the sheet
            const subject = message.getSubject() || ""; // Email subject
            const from = message.getFrom() || ""; // Sender's email address
            const replyTo = message.getReplyTo() || ""; // Reply-To field (if available)
            const date = message.getDate() || ""; // Date the email was received
            const snippet = message.getPlainBody().substring(0, 100) || ""; // Email body snippet (first 100 characters)
            
            const row = [
              messageId,  // Unique message ID
              subject,    // Subject of the email
              from,       // From field (sender)
              replyTo,    // Reply-To field (if available)
              date,       // Date of the email
              snippet,    // Snippet of the email body
              "",         // Placeholder for Assigned column
              "Pending"   // Placeholder for Status column
            ];
            sheet.appendRow(row);
          }
        });
      });

      startIndex += batchSize; // Move to the next batch of emails
    }
  }
}
