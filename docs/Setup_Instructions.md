# Setup Instructions

Follow these steps to set up the Gmail-to-Google-Sheet automation.

## Step 1: Set Up the Google Sheet
1. Open Google Sheets and create a new spreadsheet.
2. Name the sheet (e.g., "Interac Emails").
3. Label columns as follows in **Row 1**:
   - `Message ID`, `Subject`, `From`, `Reply-To`, `Date`, `Snippet`, `Assigned`, `Status`

## Step 2: Add Google Apps Script
1. In your Google Sheet, go to **Extensions > Apps Script**.
2. Delete any default code and copy the contents of `src/Code.gs` into the editor.
3. Save the script (e.g., "Gmail Fetch Script").

## Step 3: Set Up Triggers
1. In the Apps Script editor, click on the **Triggers** icon (clock icon).
2. Click **+ Add Trigger**.
3. Configure the trigger:
   - **Function to run**: `fetchInteracEmailsToSheet`
   - **Event source**: Time-driven
   - **Type of time-based trigger**: Choose `Hourly` (or adjust to your preference).

## Step 4: Test the Script
1. Return to your sheet and run the script manually from **Run > fetchInteracEmailsToSheet** to check if emails populate the sheet correctly.
2. If successful, the scheduled trigger will continue to run based on your configuration.

## Notes
- To avoid exceeding Gmail quotas, limit the script frequency if high email volume is expected.
- The script appends only new, unlogged emails based on unique message IDs.
