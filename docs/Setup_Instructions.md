Setup
Step 1: Set Up the Google Sheet
Open Google Sheets and create a new spreadsheet.
Name it something like "Interac Emails & Addresses".
Create the following sheets:
"Sheet1" → Used for logging Interac emails.
"Addresses" → Stores addresses for label creation.
"template" → Used as a template for generating labels.

In Sheet1,
Message ID | Subject | From | Reply-To | Date | Snippet | Assigned | Status  
In Addresses, ensure columns B–J contain name, address, and other details. Column K should be labeled "Label Needed", with "Yes" marking rows that need a label.
Step 2: Add Google Apps Script
In your Google Sheet, go to Extensions > Apps Script.
Delete any default code and copy the script files into the editor:
Paste fetchInteracEmailsToSheet for email automation.
Paste createLabelSheets for address label generation.
Save the project (e.g., "Gmail & Address Automation").
Step 3: Set Up Triggers (Optional Automation)
To run these scripts on a schedule:

In the Apps Script editor, click on the Triggers icon (clock icon).
Click + Add Trigger and configure:
For Email Fetching
Function to run: fetchInteracEmailsToSheet
Event source: Time-driven
Type of time-based trigger: Choose Hourly (or adjust to your preference).
For Address Labels
Function to run: createLabelSheets
Event source: Spreadsheet
Type of event-based trigger: Choose On Edit (if you want it to run when data changes).
Step 4: Test the Script
Return to your sheet.
Manually run:
fetchInteracEmailsToSheet → Should populate "Sheet1" with Interac emails.
createLabelSheets → Should generate sheets for addresses marked "Yes".
If everything looks correct, the scheduled triggers will continue running automatically.
