### -revise [TS Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

---

## [React TypeScript cheatsheet](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/basic_type_example)

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

---

# Typing `{children}` in React + TypeScript

## ✅ Basic Usage

When creating a React component that accepts children, use:

```tsx
type MyComponentProps = {
  children: React.ReactNode;
};

const MyComponent = ({ children }: MyComponentProps) => {
  return <div>{children}</div>;
};
```

### ✅ Recommended Type

- `children: React.ReactNode`

This supports all renderable content: JSX, strings, numbers, arrays, `null`, `undefined`, etc.

---

## 🔍 Alternative Types

| Type                 | Accepts                    | Use Case                              |
| -------------------- | -------------------------- | ------------------------------------- |
| `React.ReactNode`    | All renderable content     | ✅ Most common                        |
| `React.ReactElement` | Only JSX elements          | If expecting a **single JSX element** |
| `JSX.Element`        | Similar to `ReactElement`  | Interchangeable in practice           |
| `ReactNode[]`        | Array of React nodes       | Rare, prefer `ReactNode`              |
| `any`                | Everything, no type safety | ❌ Not recommended                    |

---

## ✅ Render Prop Pattern

If `children` is a function (render prop):

```tsx
type RenderProps = {
  children: (value: string) => React.ReactNode;
};

const RenderComponent = ({ children }: RenderProps) => {
  return <>{children("hello")}</>;
};
```

---

## ✅ Using `PropsWithChildren`

```tsx
import { PropsWithChildren } from "react";

type MyComponentProps = {
  title: string;
};

const MyComponent = ({
  title,
  children,
}: PropsWithChildren<MyComponentProps>) => {
  return (
    <div>
      {title} {children}
    </div>
  );
};
```

This auto-adds `children?: ReactNode` to your props.

---

## ✅ Summary

- Use `React.ReactNode` for general children.
- Use `React.ReactElement` if expecting a single JSX element.
- Use `PropsWithChildren<T>` to simplify props typing.

---

# Forms and Events in React + TypeScript

## 📋 Handling Forms

In React + TypeScript, form handling involves defining event types and optionally using controlled components.

### ✅ Controlled Inputs

```tsx
import { useState } from "react";

function MyForm() {
  const [name, setName] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <form>
      <input type="text" value={name} onChange={handleChange} />
    </form>
  );
}
```

- `React.ChangeEvent<HTMLInputElement>` is the correct type for `onChange` events from inputs.
- You can replace `HTMLInputElement` with `HTMLTextAreaElement`, `HTMLSelectElement`, etc., for other inputs.

---

## 🧾 Form Submission

```tsx
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  console.log("Form submitted");
};
```

Use `React.FormEvent<HTMLFormElement>` for form submissions.

---

## ✅ Full Form Example

```tsx
import { useState } from "react";

function ContactForm() {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`Email: ${email}\nMessage: ${message}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setEmail(e.target.value)
        }
        required
      />
      <textarea
        value={message}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setMessage(e.target.value)
        }
        required
      />
      <button type="submit">Send</button>
    </form>
  );
}
```

---

## 🖱️ Other Event Types

| Event       | Type in TypeScript                      |
| ----------- | --------------------------------------- |
| `onClick`   | `React.MouseEvent<HTMLButtonElement>`   |
| `onChange`  | `React.ChangeEvent<HTMLInputElement>`   |
| `onSubmit`  | `React.FormEvent<HTMLFormElement>`      |
| `onKeyDown` | `React.KeyboardEvent<HTMLInputElement>` |
| `onFocus`   | `React.FocusEvent<HTMLInputElement>`    |

---

## 💡 Tips

- Always type event handlers explicitly when needed for clarity and safety.
- Use `e.currentTarget` when you need to refer to the element the event handler is bound to.
- Use `e.preventDefault()` in submit handlers to stop page reload.

---

## ✅ Summary

- Use specific event types like `React.ChangeEvent`, `React.FormEvent`, etc.
- Use `useState` to control form inputs.
- Always type your event handlers for safety and auto-completion.

# React Event Types in TypeScript

| Event Type                | DOM Event                   | Example DOM Element           | Use for...                     |
| ------------------------- | --------------------------- | ----------------------------- | ------------------------------ |
| `React.ChangeEvent<T>`    | `change`                    | `input`, `textarea`, `select` | Tracking form field changes    |
| `React.FormEvent<T>`      | `submit`                    | `form`                        | Handling form submission       |
| `React.MouseEvent<T>`     | `click`, `mouseenter`, etc. | `button`, `div`, etc.         | Handling mouse interactions    |
| `React.KeyboardEvent<T>`  | `keydown`, `keyup`, etc.    | `input`, `textarea`, etc.     | Keyboard events                |
| `React.FocusEvent<T>`     | `focus`, `blur`             | Any focusable element         | Input focus/blur tracking      |
| `React.InputEvent<T>`     | `input`                     | `input`, `textarea`           | Lower-level input change       |
| `React.DragEvent<T>`      | `drag`, `drop`, etc.        | Drag-and-drop elements        | Drag and drop logic            |
| `React.TouchEvent<T>`     | `touchstart`, `touchend`    | Mobile/touch devices          | Touch-based interaction        |
| `React.ClipboardEvent<T>` | `copy`, `paste`, etc.       | `input`, etc.                 | Handling clipboard interaction |
| `React.WheelEvent<T>`     | `wheel`                     | Scrollable elements           | Scroll wheel actions           |

---

```js
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  console.log("Mouse clicked at", e.clientX, e.clientY);
};

const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  console.log("Key pressed:", e.key);
};

const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
  console.log("Input focused!");
};
```

---

# React Form Handling with Fetch (TypeScript)

This guide covers two common ways to handle forms in React with `fetch()`:

---

## ✅ 1. Using FormData + fetch (Uncontrolled Inputs)

```tsx
import React from "react";

function ContactForm() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData, // Automatically sets content-type
      });

      if (!response.ok) throw new Error("Something went wrong");

      const data = await response.json();
      console.log("Server response:", data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" required />
      <input name="email" type="email" placeholder="Email" required />
      <textarea name="message" placeholder="Message" required />
      <button type="submit">Send</button>
    </form>
  );
}
```

---

## ✅ 2. Using useState + fetch with JSON (Controlled Inputs)

```tsx
import React, { useState } from "react";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to submit");

      const data = await response.json();
      console.log("Submitted successfully:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Message"
      />
      <button type="submit">Send</button>
    </form>
  );
}
```

---

## 🧠 Summary

| Approach        | Use Case                            |
| --------------- | ----------------------------------- |
| FormData        | For simple or file-upload forms     |
| useState + JSON | For controlled forms and validation |

- ✅ Always use `e.preventDefault()` in submit handlers.
- ✅ Use `e.currentTarget` to get the `<form>` element.
- ✅ Handle fetch errors with `try/catch`.

---

# 🌐 React + TypeScript: Using Context API

React’s `Context API` lets you share data (like themes or authenticated users) across your component tree without passing props manually at every level.

---

## ✅ Basic Example: Theme Context

```tsx
import { createContext, useContext, useState } from "react";

// 1. Define the type of the context
type ThemeContextType = "light" | "dark";

// 2. Create the context with default value
const ThemeContext = createContext<ThemeContextType>("light");

// 3. Wrap your component tree with the Provider
const App = () => {
  const [theme, setTheme] = useState<ThemeContextType>("light");

  return (
    <ThemeContext.Provider value={theme}>
      <MyComponent />
    </ThemeContext.Provider>
  );
};

// 4. Consume the context inside any component
const MyComponent = () => {
  const theme = useContext(ThemeContext);
  return <p>The current theme is {theme}.</p>;
};
```

---

## ⚠️ When You Don't Have a Meaningful Default

Use `null` as the default value and handle with care:

```tsx
import { createContext, useContext, useState } from "react";

interface CurrentUserContextType {
  username: string;
}

const CurrentUserContext = createContext<CurrentUserContextType | null>(null);

const App = () => {
  const [currentUser] = useState<CurrentUserContextType>({
    username: "filiptammergard",
  });

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <MyComponent />
    </CurrentUserContext.Provider>
  );
};
```

Consume the context with optional chaining:

```tsx
const MyComponent = () => {
  const currentUser = useContext(CurrentUserContext);
  return <p>Name: {currentUser?.username}</p>;
};
```

---

## 🛡️ Better: Custom Hook with Runtime Check

```tsx
const useCurrentUser = () => {
  const currentUserContext = useContext(CurrentUserContext);
  if (!currentUserContext) {
    throw new Error(
      "useCurrentUser must be used within <CurrentUserContext.Provider>"
    );
  }
  return currentUserContext;
};

const MyComponent = () => {
  const currentUser = useCurrentUser();
  return <p>Username: {currentUser.username}</p>;
};
```

---

## 💡 Other Type-safe Options

### ✅ Type Assertion

```tsx
const currentUser = useContext(CurrentUserContext)!;
```

### ✅ Empty Object Cast

```tsx
const CurrentUserContext = createContext<CurrentUserContextType>(
  {} as CurrentUserContextType
);
```

### ✅ Non-null Assertion

```tsx
const CurrentUserContext = createContext<CurrentUserContextType>(null!);
```

> ✅ **Recommendation**: Prefer runtime checking (with error throw) over type assertions.

---
