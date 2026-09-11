# Web Interface Guidelines Review

From `skills2`. Use after implementation, or when the user asks to review UI, check accessibility, audit design, review UX, or check the site against best practices.

## How it works

1. Fetch the latest guidelines from the source URL below
2. Read the specified files (or prompt the user for files/pattern)
3. Check against all rules in the fetched guidelines
4. Output findings in the terse `file:line` format specified by the guidelines
5. Fix critical and accessibility findings in this repo before declaring the task complete

## Guidelines source

Fetch fresh guidelines before each review:

```
https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md
```

Use WebFetch to retrieve the latest rules. The fetched content contains all the rules and output format instructions.

## Usage

When a user provides a file or pattern argument:

1. Fetch guidelines from the source URL above
2. Read the specified files
3. Apply all rules from the fetched guidelines
4. Output findings using the format specified in the guidelines

If no files specified, ask the user which files to review.

After an image-to-code implementation, review every file you changed without waiting to be asked.
