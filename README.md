# Cloudflare Worker: DDoS Path Blocker

This Cloudflare Worker is purpose-built to mitigate potential threats by
restricting access to paths frequently targeted in Distributed Denial-of-Service
(DDoS) attacks or other malicious activities. By analyzing incoming requests
against predefined patterns associated with sensitive directories, files, and
file extensions, the Worker ensures unauthorized access is effectively
prevented. When a request matches these patterns, the Worker responds with an
unauthorized status code (500), thereby blocking the request and alleviating
unnecessary load on the origin server.

## Features

- **Path Blocking**: Restricts access to sensitive paths such as `/wp-.*`,
  `/admin`, `/debug`, and others.
- **File Extension Blocking**: Prevents access to specific file types, including
  `.php` and `.env`.
- **Regex-Based Filtering**: Employs regular expressions for efficient and
  secure pattern matching across a broad range of potential threats.

## Installation

### Step 1: Install the Cloudflare Worker

- Clone the repository locally.
- Optionally, push the repository to your GitHub account.
- Execute `yarn` and then `yarn deploy`.
- Log in to your Cloudflare account via the automatically opened browser page.
- Select the desired Cloudflare account for installation and confirm.

### Step 2: Configure the Worker

- After deployment, navigate to the "Workers & Pages" section in the Cloudflare
  dashboard.
- Open the newly deployed Worker and proceed to the Settings tab.
- Disable the "Domains & Routes" URLs.

If publishing via GitHub, follow these additional steps:

- In the same Settings page, scroll to the Build section.
- In the "Git repository" section, click "GitHub".
- Authorize the Cloudflare App and complete the GitHub integration
  configuration.

### Step 3: Attach the Worker to a Domain

Option 1:

- In the "Domains & Routes" section where you disabled the previous domains,
  click the "+ Add" button.
- Choose the "Route" option.
- Select the appropriate Zone.
- Specify the domain where the Worker should run
- Click "Add Route."

Option 2:

- Navigate to the domain you wish to attach the Worker to.
- Access the "Workers Routes" section in the sidebar.
- Click "Add route," then specify the domain.
- Select the new Worker from the dropdown menu
- Save the configuration.

## How It Works

1. **Pattern Matching**: The Worker uses predefined regular expressions to
   determine if a requested path matches any of the blocked patterns.
2. **Pattern List**:
   - Includes sensitive directories such as `/wp-*`, `/admin`, and `/debug`.
   - Targets specific file types such as `.php`, `.env`, and others associated
     with potential security vulnerabilities.
3. **Unauthorized Response**: Requests matching blocked patterns are immediately
   denied with a 500 (Internal Server Error) status and an "unauthorized"
   message.
4. **Request Forwarding**: Requests that do not match any blocked patterns are
   forwarded to the origin server for standard processing.

## Benefits

- **Enhanced Security**: Protects against unauthorized access to sensitive
  directories and files, commonly targeted during malicious attacks.
- **Customizable Configuration**: Allows easy modification of blocked patterns
  by updating the `blockedPatterns` array to meet specific security needs.

## Example Use Cases

- **DDoS Mitigation**: Blocks traffic directed at known vulnerable or unused
  paths such as `/admin`, `/backup`, or `/installer`.
- **Sensitive File Protection**: Prevents access to files such as `.env` or
  `.php`, which may contain critical information.
- **Web Application Security**: Hardens security against path traversal and
  malicious file access attempts.

## License

This project is licensed under the MIT License. For more details, refer to the
[LICENSE](LICENSE) file.
