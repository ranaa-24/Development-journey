# **Week 13 - 13.1 | Tailwind, Ref Arrays and Building Components**

## [Notes/Slides Link](https://www.canva.com/design/DAGVU1RXwn0/EBNpEgL7LxVUQd6ThorItA/edit?utm_content=DAGVU1RXwn0&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)

### https://github.com/100xdevs-cohort-3/week-13-otp-box

### [dub GitHub](https://github.com/dubinc/dub)


## Articles/Blogs Link:
-   [**Basic Units**](https://tailwindcss.com/docs/width)

-   [**Learn React – A Handbook for Beginners**](https://www.freecodecamp.org/news/react-for-beginners-handbook/#:~:text=React%20is%20a%20very%20popular,operation%20and%20should%20be%20minimized)
-   [**What is Tailwind CSS? A Beginner's Guide**](https://www.freecodecamp.org/news/what-is-tailwind-css-a-beginners-guide/)
-   [**Tailwind CSS: What It Is, Why Use It & Examples**](https://blog.hubspot.com/website/what-is-tailwind-css)
-   [**Using Tailwind CSS with React.js: A Concise Guide**](https://dev.to/haszankauna/using-tailwind-css-with-reactjs-a-concise-guide-33j)
-   [**How to Setup React and Tailwind CSS with Vite in a Project**](https://www.freecodecamp.org/news/how-to-install-tailwindcss-in-react/)
-   [**Install Tailwind CSS with Vite**](https://tailwindcss.com/docs/guides/vite)
-   [**Configuration**](https://tailwindcss.com/docs/configuration)
-   [**CSS Frameworks vs Custom CSS – What's the Difference?**](https://www.freecodecamp.org/news/css-frameworks-vs-custom-css/)


## Videos:
-   [**Intro - 1**](https://www.youtube.com/watch?v=HFr4h7WD6Hc)
-   [**Explained Gracefully**](https://www.youtube.com/watch?v=HOiER5NadIc)



# Tailwind CSS: Under the Hood & @layer Explanation

## 🧩 What is `@layer` in Tailwind CSS?

```css
@layer base {
  *, ::after, ::before, ::backdrop, ::file-selector-button {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0 solid;
  }
}
```

### ✅ Language: CSS (with Tailwind Directives)

This is CSS using Tailwind-specific directives. `@layer` is used by Tailwind to organize and scope styles effectively.

### 🧠 Explanation of `@layer`

Tailwind uses the `@layer` directive to define custom styles inside one of three conceptual layers:

- **base**: For resets and low-level styles (like the `box-sizing` reset above)
- **components**: For custom UI components
- **utilities**: For utility classes like `p-4`, `text-center`, etc.

Organizing styles this way helps with:

- Merge strategies during builds
- Layered specificity
- Better optimization and purging

---

## ⚙️ How Tailwind CSS Works Under the Hood

### 1. 🧱 You Write Utility Classes in HTML

```html
<div class="bg-blue-500 text-white p-4 rounded-lg">Hello</div>
```

These class names are not pre-defined CSS. They are **generated on-demand** by Tailwind.

---

### 2. 🔍 Tailwind Scans Your Files (Content Purging)

Tailwind scans your HTML/JSX/Vue/etc. files for class names specified in:

```js
// tailwind.config.js
content: ["./src/**/*.{html,js,jsx,ts,tsx}"]
```

---

### 3. 🛠 Tailwind Generates CSS via PostCSS

Tailwind is a PostCSS plugin. During build:

- It reads your used class names
- Looks them up in its internal system
- Dynamically generates only the CSS you use

Example:

```html
<p class="text-xl font-bold text-gray-700"></p>
```

Generates:

```css
.text-xl { font-size: 1.25rem; line-height: 1.75rem; }
.font-bold { font-weight: 700; }
.text-gray-700 { color: rgba(55, 65, 81, 1); }
```

---

### 4. 📚 Layers and @apply

Tailwind uses internal layers (`@layer base`, `@layer utilities`, etc.) and supports `@apply`:

```css
.btn {
  @apply px-4 py-2 bg-blue-500 text-white;
}
```

---

### 5. 🧹 Tree-Shaking / Purging

In production, Tailwind removes unused CSS classes — keeping the final CSS file size tiny.

---

## ✅ Summary

| Step | What Happens |
|------|--------------|
| 🏗 Write HTML | Use utility classes |
| 🔍 Scan Content | Tailwind finds used classes |
| 🛠 Generate CSS | Builds CSS via PostCSS |
| 🧹 Purge Unused | Removes unused classes |
| ⚡ Fast CSS | Efficient final stylesheet |


----

<center>Tailwind CLI</center>

----

# 🎨 Custom CSS in Tailwind CSS & Utility Layer Priority

## ✅ How to Add Custom CSS in Tailwind CSS

You can add your own custom classes in the same file where you import Tailwind, using `@layer` directives.

### 📁 Example: In your `src/input.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .btn-primary {
    @apply bg-blue-600 text-white font-semibold px-4 py-2 rounded;
  }
}

@layer utilities {
  .text-shadow {
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  }
}
```

### 🔍 Why use `@layer`?
- Ensures your custom CSS is **included in the build**
- Helps Tailwind **optimize and purge unused styles**
- Maintains **correct cascade order** (see below)

---

## 🤔 Why Use `@layer base`, `components`, and `utilities`?

| Layer          | Purpose                                                   |
|----------------|-----------------------------------------------------------|
| `@layer base`       | Default/reset styles (e.g., body, h1)                    |
| `@layer components` | Reusable block of utility classes(e.g., buttons, cards)                  |
| `@layer utilities`  | Utility-style helpers, indevidual classes (e.g., `.rotate-30`, `.glow`)    |

Using these layers:
- Keeps your CSS organized
- Lets Tailwind handle purging correctly
- Ensures **predictable CSS overriding behavior**

---

## ⚖️ Does `@layer utilities` Have the Highest Priority?

✅ Yes, **utilities have the highest priority** in Tailwind's layer system.

**Order of importance (lowest to highest):**
1. `@layer base` (e.g., resets)
2. `@layer components` (e.g., `.btn`)
3. `@layer utilities` (e.g., `bg-red-500`, `text-lg`)

### 🧠 Why?
This ensures that if you apply a utility class in your HTML, it can override base and component styles safely and predictably.

**Example:**
```html
<button class="btn-primary bg-green-500">
  <!-- bg-green-500 will override the bg-blue from btn-primary -->
</button>
```

---

## 📌 Summary

- ✅ Write custom classes in `input.css` inside `@layer`
- 📦 Tailwind uses layers to manage **cascade and purge**
- 🥇 `@layer utilities` has the highest override power


----

<center>React</center>

----



# 🚀 Tailwind CSS + React + Vite Setup 

This guide covers the latest official method for setting up Tailwind CSS in a React + Vite project using the new `@tailwindcss/vite` plugin.

---

## ✅ Step 1: Install Tailwind and the Vite Plugin

```bash
npm install tailwindcss @tailwindcss/vite
```

---

## ✅ Step 2: Configure the Vite Plugin

Edit your `vite.config.js` or `vite.config.ts`:

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

---

## ✅ Step 3: Import Tailwind in Your CSS

In your `src/index.css` or main CSS file:

only need to import Tailwind directives once in a global CSS file (typically `index.css`), and import that file once (usually in` main.jsx` or `App.jsx`). After that, all components in the React app can use Tailwind utility classes.

```css
@import "tailwindcss";
```

---

## ✅ Step 4: Import the CSS in Your Entry File

In `src/main.jsx` or `src/main.tsx`:

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

---

## ✅ Step 5: Start Your Development Server

```bash
npm run dev
```

---

## 🧠 Key Points

- ✅ `@tailwindcss/vite` simplifies Tailwind integration with Vite by handling internal configuration.
- ✅ You only need to import Tailwind once in a global CSS file.
- ✅ Tailwind styles are bundled automatically; no separate `output.css` is generated.
- ✅ Works seamlessly with all React components in the project.

---

## 🛠 Optional: Production Build

To create a production build with optimized Tailwind CSS:

```bash
npm run build
```

Vite will tree-shake and purge unused Tailwind classes automatically using the `content` paths from your `tailwind.config.js`.

---

# Custom classes 

If you're writing **basic global custom CSS**, like setting a custom class with standard styles:

```css
@import "tailwindcss";

.my-box {
  @apply p-4 bg-blue-500 text-white;
}
```

Yes, you **can** define it directly in `index.css` under the `@import` without `@layer`. It will work — especially during development.

---

## 💡 But Here's the Important Detail:

Tailwind uses **layer-based style organization** (`base`, `components`, `utilities`) for correct **style ordering** and **purging unused CSS** in production builds.

---

## ❗ Why You Should Often Use `@layer`:

If you **don’t** wrap your custom styles inside `@layer`, Tailwind might:

- 🚫 Remove your styles during production builds (tree-shaking).
- ⚠️ Order your styles incorrectly, breaking overrides or priorities.

---

## ✅ Correct Way (Recommended for Production):

```css
@import "tailwindcss";

@layer components {
  .my-box {
    @apply p-4 bg-blue-500 text-white;
  }
}

@layer utilities {
  .btn-shadow {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
}
```

### 🔐 This Ensures:
- Tailwind knows *where* your styles belong.
- Your styles won’t be removed during build.
- Ordering is consistent (base → components → utilities).

---

## 🔍 When Can You Skip `@layer`?

You can skip `@layer` **only if**:

- You're **not using `@apply`**, just plain CSS.
- You're writing styles that are **not meant to be purged**.
- You're in **development** and just trying things quickly.

---

## 🧠 TL;DR Summary

| Scenario                          | Use `@layer`? | Why                                               |
|----------------------------------|---------------|----------------------------------------------------|
| Basic global styles              | Optional      | Fine during dev, but may be purged in production   |
| Using `@apply` in custom classes | ✅ Yes         | Required for purge + layering to work correctly    |
| Defining new utility-like classes| ✅ Yes         | Needed for Tailwind build to include them properly |
| Only plain CSS, no Tailwind      | ❌ No          | Doesn’t matter, normal CSS rules apply             |
