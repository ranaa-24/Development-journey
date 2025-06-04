
# JavaScript and React Learning Notes

## 1️⃣ Confirmation Before Reload

- Use `beforeunload` event to ask for confirmation before page reload.
- Example:

  ```javascript
  window.addEventListener('beforeunload', function (e) {
    e.preventDefault();
    e.returnValue = ''; // Triggers the confirmation dialog
  });
  ```

## 2️⃣ React Context for File Handling (with TypeScript)

- Create a context to store and manage file state.
- Example:

  ```typescript
  import { createContext, useState, type Dispatch, type SetStateAction } from 'react';

  interface FileContextType {
    file: File | null;
    setFile: Dispatch<SetStateAction<File | null>>;
  }

  export const FileContext = createContext<FileContextType | null>(null);

  export function FileProvider({ children }: { children: React.ReactNode }) {
    const [file, setFile] = useState<File | null>(null);
    const value = { file, setFile };
    return <FileContext.Provider value={value}>{children}</FileContext.Provider>;
  }
  ```

## 3️⃣ Get a String with a Max Length of 20 Characters

- Use `slice()` or `substring()` methods.
- Example:

  ```javascript
  const longString = "This is a long string that we want to shorten.";
  const shortString = longString.slice(0, 20); // or substring(0, 20)
  console.log(shortString);
  ```

- Add ellipsis:

  ```javascript
  const truncateString = (str) => {
    return str.length > 20 ? str.slice(0, 20) + '...' : str;
  };
  ```

---

These are the main concepts covered so far.
