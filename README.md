# Gmail-to-Google-Sheet-Automation

This project automates fetching specific emails from Gmail to a Google Sheet. It captures details such as the subject, sender, reply-to address, and a snippet of each email. The script also supports scheduled triggers to check for new emails regularly.

## Features
- Fetches emails from a specific sender (`notify@payments.interac.ca`).
- Avoids duplicate entries by tracking message IDs.
- Supports scheduled triggers for automatic fetching.

## Prerequisites
- Google Account with access to Gmail and Google Sheets.
- Basic familiarity with Google Apps Script.

## Setup
1. **Create a Google Sheet**: Set up columns for `Message ID`, `Subject`, `From`, `Reply-To`, `Date`, `Snippet`, `Assigned`, and `Status`.
2. **Add Google Apps Script**: Copy the code from `src/Code.gs` into your Google Sheet's Apps Script editor.
3. **Schedule Trigger**: Set up a time-driven trigger to automate fetching emails.

For detailed setup instructions, see [docs/Setup_Instructions.md](docs/Setup_Instructions.md).
