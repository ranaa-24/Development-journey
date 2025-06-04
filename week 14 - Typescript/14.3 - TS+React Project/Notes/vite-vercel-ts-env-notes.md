# Notes: Vite + Vercel Deployment, Env Variables, and TypeScript Issues

## ✅ 1. Setting `VITE_BASE_PATH` on Vercel
- `VITE_BASE_PATH` controls the base public path for your app.
- In `vite.config.ts`, it's common to write:
  ```ts
  base: import.meta.env.VITE_BASE_PATH || '/'
  ```
- On Vercel, set `VITE_BASE_PATH` to `/` if deploying at root domain.
- If deploying under a subpath (`/image-enhancer`), use that instead.

## ⚠️ 2. TypeScript Error: `Cannot find name 'process'`
- This happens when using `process.env` without Node types.
- Solution:
  ```bash
  npm i --save-dev @types/node
  ```
- But `process.env` should be avoided in Vite browser code.

## ✅ 3. Vite Best Practice: Use `import.meta.env`
- Vite replaces env vars via `import.meta.env` (not `process.env`).
- Example (correct):
  ```ts
  const basePath = import.meta.env.VITE_BASE_PATH || '/image-enhancer';
  ```

## 🔧 4. TypeScript Fix for `import.meta.env`
If TypeScript says "`env` does not exist on type 'ImportMeta'":

1. Create a `vite-env.d.ts` file in root.
2. Add:
   ```ts
   /// <reference types="vite/client" />
   ```

Or declare manually:
```ts
interface ImportMetaEnv {
  readonly VITE_BASE_PATH: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

## ❌ 5. Problem: `/home` gives 404 on Vercel
- Vercel is a static file host. `/home` is not a real file.
- React Router (SPA) handles routing **in-browser**, so direct navigation fails.

## ✅ 6. Fix: Add `vercel.json`
In project root, create `vercel.json`:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```
This serves `index.html` for all paths.

## 🧠 Summary
| Problem                     | Solution                                      |
|----------------------------|-----------------------------------------------|
| `process` not found        | `npm i @types/node --save-dev`                |
| `import.meta.env` error    | Add `vite-env.d.ts` or `/// <reference ...>`  |
| `/home` 404 on Vercel      | Add `vercel.json` rewrite rule                |
| `process.env` in browser   | ❌ Avoid. Use `import.meta.env` instead       |

---

Generated from conversation with ChatGPT.