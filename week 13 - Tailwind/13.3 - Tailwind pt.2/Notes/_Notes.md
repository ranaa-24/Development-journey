## [Detecting system theme in JavaScript / CSS / React](https://medium.com/hypersphere-codes/detecting-system-theme-in-javascript-css-react-f6b961916d48)

## [Dark mode v4](https://www.youtube.com/watch?v=5SsYpZUKG8M)
## [Dark mode v4 Docs](https://tailwindcss.com/docs/dark-mode)
## [Dark mode Lagacy](https://www.youtube.com/watch?v=NxIBnvb8B7Y)
## [HeroIcon](https://heroicons.com/)
## [lucid-icon](https://lucide.dev/guide/packages/lucide-react)



# Dark Mode in Tailwind

Tailwind provides two main strategies to handle dark mode:

- Media-based dark mode (default:`media`)

- Class-based dark mode (`class`)

### Default Behavior: media (prefers-color-scheme)

```js
// tailwind.config.js
export default {
  darkMode: 'media',
}
```

- This uses the `prefers-color-scheme` media query.
- It automatically matches the user’s OS/browser theme (light or dark).
- You use dark mode utilities like this:

```html
<div class="bg-white text-black dark:bg-black dark:text-white">
  Hello World
</div>
```
If the system is in dark mode, Tailwind will apply the styles prefixed with `dark:`

##  Manual Toggle: `class`

To manually control dark mode (e.g., with a toggle switch in your app), you change the config:

```js

// tailwind.config.js
export default {
  darkMode: 'class',
}
```

This means you control dark mode by toggling a `dark` class on a parent element — typically <html> or <body>.

```html
<html class="dark">
  <div class="bg-white text-black dark:bg-black dark:text-white">
    Hello World
  </div>
</html>
```


# Tailwind CSS v4 – No More tailwind.config.js by Default

Variants like `dark:` now work via CSS custom variants using `@custom-variant`.

## How Dark Mode Works in Tailwind v4

By default, Tailwind v4 enables dark mode both ways:

- Automatically using `prefers-color-scheme`

- Or manually by toggling a `.dark` class on a parent element (like <html>)

```css
@custom-variant dark (&:where(.dark, .dark *));
```

This means:

- Tailwind will apply `dark:` styles if the element or any parent has the `.dark` class.
- You don't need to manually enable darkMode: 'class' or media in a config anymore — it just works.
