# ProjectFlow

A frontend-only React project management dashboard built with Vite, Tailwind CSS v4, Lucide icons, Recharts, and browser Local Storage.

## Run locally

1. Open this folder in VS Code.
2. Open Terminal in the project root (the folder containing `package.json`).
3. Run:

```bash
npm install
npm run dev
```

4. Open the local URL printed in the terminal, usually `http://localhost:5173`.

## Features

- Dashboard statistics and activity chart
- Project creation, editing, searching, and deletion
- Task creation, editing, deletion, filtering, and status updates
- Kanban task board
- Calendar with task deadlines
- Team page (sample data)
- Settings, JSON backup export, and reset to demo data
- Projects and tasks persist in Local Storage

## Notes

- This is a frontend demo. Team invites, login, shared collaboration, and server sync are not implemented.
- Data stays in the current browser/device unless you export a backup.
- If you already have a Vite project, you can copy the `src` folder and the config files into it, but install dependencies listed in `package.json`.
