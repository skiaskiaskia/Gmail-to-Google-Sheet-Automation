Gmail & Address Automation with Google Sheets
This project automates two key functions using Google Apps Script:

Fetching Emails from Gmail to Google Sheets

Captures details such as subject, sender, reply-to address, date, and a snippet of each email.
Avoids duplicates by tracking message IDs.
Supports scheduled triggers for automatic fetching.
Generating Address Labels in Google Sheets

Creates new sheets from a template based on address data.
Filters addresses where labels are marked as "Yes" and auto-fills relevant fields.
Features
Gmail to Google Sheets
✅ Fetches emails from notify@payments.interac.ca.
✅ Skips already logged emails to prevent duplication.
✅ Can run on an automated schedule via triggers.

Address Label Creation
✅ Extracts address data from the "Addresses" sheet.
✅ Copies a predefined template for each new label.
✅ Automatically fills in name, street, city, province, and postal code.

Prerequisites
Google Account with access to Gmail and Google Sheets.
Basic familiarity with Google Apps Script.
