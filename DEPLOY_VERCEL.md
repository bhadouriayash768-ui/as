# Deploying Syntha Airlabs to Vercel

This package is prepared as a **static Vite site** and does not require a database, server secret, or custom environment variable.

## Deployment steps

| Step | What to do in Vercel |
| --- | --- |
| 1 | Extract the supplied flat ZIP into a new Git repository, then connect that repository to Vercel. |
| 2 | In Vercel, select **Add New → Project**, then import that repository. |
| 3 | Keep the detected install command as `pnpm install --frozen-lockfile`. |
| 4 | Use `pnpm run build:vercel` for the build command and `vercel-dist` for the output directory. The committed `vercel.json` will normally set both automatically. |
| 5 | Click **Deploy**. The project is a single-page site, and the rewrite rule keeps the main route available after refresh. |
| 6 | In **Settings → Domains**, add your custom domain or use the Vercel URL assigned after the first deployment. |

## Local check

Run the following from the project root before pushing later changes:

```bash
pnpm install --frozen-lockfile
pnpm run build:vercel
```

> The guardian, logo, process diagram, and contact background are self-contained in the deployed frontend. No Manus media URL is required for the Vercel deployment.

## Important note

This package is prepared for Vercel static hosting. The build outputs a root-level `vercel-dist/index.html`, which Vercel serves directly; the development-only `server/` folder is not used by the `build:vercel` command.

> This refreshed ZIP is **flat**: `package.json` and `vercel.json` are directly at its top level. In Vercel, leave **Root Directory** as `./` (the repository root).
