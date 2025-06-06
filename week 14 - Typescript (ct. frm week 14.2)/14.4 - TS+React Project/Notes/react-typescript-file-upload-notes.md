
# 📘 React + TypeScript Notes (Drag & Drop, Event Types, File Upload)

---

## 1. Understanding `React.FC`

### ✅ What it does:
- Types your component as a React Function Component
- Includes `children` automatically
- Helps with IntelliSense

### ⚠️ Downsides:
- Automatically includes `children` (even if you don’t want them)
- Can be verbose
- Explicit prop typing is often clearer

### ✅ Example:

```tsx
const MyComponent: React.FC = () => <div>Hello</div>;
```

---

## 2. Better Practice: Typing Props Without `React.FC`

### ➕ Explicitly define props:

```tsx
type MyComponentProps = {
  onUpload?: (file: File) => void;
};

const MyComponent = ({ onUpload }: MyComponentProps) => {
  return <div>Upload</div>;
};
```

### ✅ Use `React.FC` when:
- You need `children`
- You want quick setup for small components

### 🚫 Avoid it when:
- You don’t use `children`
- You want full control of prop typing

---

## 3. Common React Synthetic Event Types

| DOM Event       | React Type                         |
|-----------------|-------------------------------------|
| `onChange`      | `React.ChangeEvent<HTMLInputElement>` |
| `onClick`       | `React.MouseEvent<HTMLButtonElement>` |
| `onSubmit`      | `React.FormEvent<HTMLFormElement>` |
| `onDrop`        | `React.DragEvent<HTMLDivElement>` |
| `onKeyDown`     | `React.KeyboardEvent<HTMLInputElement>` |

---

## 4. Drag-and-Drop File Upload

### ✅ How to handle drag files:

```tsx
const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
  e.preventDefault();
  const files = e.dataTransfer.files;
};
```

- `dataTransfer` is only available on **drag events**
- Other events like `change` do **not** have `dataTransfer`

---

## 5. Handling File Input Upload

### ✅ From `<input type="file">`

```tsx
const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
};
```

- `e.target.files` gives access to uploaded files
- Works only for `type="file"`

---

## 6. Why Use React Event Types?

- React wraps native events with `SyntheticEvent`
- Using native `Event` types may cause type errors
- Always use React types like `React.ChangeEvent`, etc.

---

## 7. Displaying Uploaded Image

### ✅ Steps:
1. Get file using `e.target.files[0]`
2. Create preview URL with `URL.createObjectURL(file)`
3. Display it in `<img src="..." />`

### 💻 Code:

```tsx
import React, { useState } from "react";

const ImageUploader: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {imageUrl && (
        <img
          src={imageUrl}
          alt="Uploaded Preview"
          className="mt-4 w-64 h-auto rounded shadow"
        />
      )}
    </div>
  );
};

export default ImageUploader;
```

---

## 🧠 Summary

| Topic                      | Key Takeaway |
|----------------------------|--------------|
| `React.FC`                 | Optional, useful for `children`, but explicit typing is better |
| Event Typing               | Always use `React.*Event<HTMLElement>` |
| File Upload (`input`)      | Use `e.target.files` |
| Drag & Drop                | Use `e.dataTransfer.files` |
| Display image              | Use `URL.createObjectURL(file)` |

---

### 🚀 You now have a solid foundation in:
- Typing React components
- Handling file inputs
- Drag-and-drop behavior
- Rendering uploaded images
