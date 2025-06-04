## [reactDocs - Using TypeScript](https://react.dev/learn/typescript)

## [How to Use TypeScript with React](https://www.freecodecamp.org/news/use-typescript-with-react/)

# Videos

## [TypeScript in React - COMPLETE Tutorial ](https://www.youtube.com/watch?v=joTOrCiAPB4) +1

## [TypeScript in React - COMPLETE Tutorial ](https://www.youtube.com/watch?v=TPACABQTHvM)

## [Understanding React's types - Live ](https://www.freecodecamp.org/news/use-typescript-with-react/)

---

# Understanding `React.FC` and Event Typing in TypeScript

## 📘 Part 1: What is `React.FC`

`React.FC` (or `React.FunctionComponent`) is a built-in generic type in TypeScript that you can use to type functional components in React.

### ✅ What `React.FC` does:

- Ensures your function returns a valid React element (`JSX.Element`).
- Automatically types the `children` prop.
- Provides better editor support (e.g., IntelliSense in VSCode).

---

### ✅ Example Using `React.FC`

```tsx
const FileUpload: React.FC = () => {
  return <div>Upload</div>;
};
```

---

### ⚠️ Why Some Developers Avoid `React.FC`

1. **Implicit `children` prop**:
   You get `children` whether you use them or not.

2. **Verbose for simple cases**:
   If your component doesn't take props, it's unnecessary.

3. **Limited control over props**:
   Explicitly defining prop types is often clearer and more flexible.

---

### ✅ Better Practice (No Props)

If your component doesn't take any props:

```tsx
const FileUpload = () => {
  return <div>Upload</div>;
};
```

---

### ✅ Better Practice (With Props)

If your component takes custom props:

```tsx
type FileUploadProps = {
  onUpload?: (file: File) => void;
};

const FileUpload = ({ onUpload }: FileUploadProps) => {
  return <div>Upload</div>;
};
```

---

### ✅ When to Use `React.FC`

- You rely on `children` being typed automatically.
- You want quick IntelliSense in small components.

### 🚫 When to Avoid `React.FC`

- You want full control over props.
- You don’t need `children`.

---

## 🧠 Conclusion

`React.FC` is **not wrong**, but it’s **optional**. Many modern TypeScript projects prefer using plain function declarations with explicit prop typing for clarity and control.

---

## 📘 Part 2: Common React Synthetic Event Types in TypeScript

React wraps native DOM events with its own wrapper called **SyntheticEvent** to ensure consistency across browsers. TypeScript lets you strongly type these events based on the DOM element they originate from.

### ✅ Common Event Type Examples

| DOM Event   | React Event Type                  |
| ----------- | --------------------------------- |
| `onChange`  | `ChangeEvent<HTMLInputElement>`   |
| `onClick`   | `MouseEvent<HTMLButtonElement>`   |
| `onSubmit`  | `FormEvent<HTMLFormElement>`      |
| `onDrop`    | `DragEvent<HTMLDivElement>`       |
| `onKeyDown` | `KeyboardEvent<HTMLInputElement>` |

---

### ✅ Example

```tsx
const handleDrop = (e: DragEvent<HTMLDivElement>) => {
  e.preventDefault();
  const files = e.dataTransfer.files;
};
```

This means:

> Handle a drag-and-drop event on a `<div>` and get full TypeScript IntelliSense for `dataTransfer.files`, etc.

---

### 🧠 Pro Tip

Use specific element types like `HTMLInputElement`, `HTMLFormElement`, etc., for better typing and fewer bugs.

---

## ✅ Summary

- Use `React.FC` if you want `children` included automatically and quick IntelliSense.
- Prefer explicit prop typing (`type Props = {}`) for more control.
- Use proper `SyntheticEvent` types to make React + TypeScript smooth and safe to work with.
