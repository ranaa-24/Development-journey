# 🧠 React OTP Input Breakdown – `GetOTP` + `InputBox` + `useRef`

This document explains how the provided React code implements an OTP input section using `useRef`, `useState`, and controlled input handling.

---

## 📦 Components Overview

### 1. `App`

```jsx
<GetOTP numberOfInputs={5} />
```

- Root component that renders `GetOTP` with 5 input boxes.

---

### 2. `GetOTP`

Responsible for rendering multiple `<InputBox />` components and managing input focus using refs.

#### 🔧 Key Features:

- Uses `useRef([])` to store a **dynamic list of input element references**.
- Maps `numberOfInputs` to render `InputBox` components.
- Passes two important props to each box:
  - `reference`: a callback ref to capture DOM element
  - `onDone`: called to **focus next input** after entering a value
  - `onBack`: called to **focus previous input** on Backspace

```js
<inputRef.current[index + 1].focus();>
```

---

### 3. `InputBox`

A controlled input field for entering a single digit.

#### 🧠 Logic:

- Uses `useState` to store the input's current value.
- `ref={reference}` receives the `callback ref` to store in `inputRef`.
- `onChange`:
  - Rejects non-numeric input.
  - Calls `onDone()` when a valid digit is typed, focusing the next input.
- `onKeyDown`:
  - Listens for `'Backspace'`.
  - If field is already empty, triggers `onBack()` to focus the previous input.

```jsx
if (e.key === "Backspace" && !val && onBack) {
  onBack();
}
```

---

## ✨ Notable Details

| Feature          | How It Works                                         |
| ---------------- | ---------------------------------------------------- |
| `useRef([])`     | Stores DOM nodes of each input element               |
| `ref={callback}` | Populates each slot in the `inputRef.current` array  |
| `onDone`         | Triggers focus to next field                         |
| `onBack`         | Triggers focus to previous field if current is empty |
| `val` state      | Ensures controlled input for each box                |
| `maxLength={1}`  | Restricts input to single digit                      |
| Tailwind styles  | Adds size, alignment, colors, and rounded corners    |

---

## ✅ Example Flow

1. User types `3` → next input focused
2. User types `5` → next input focused
3. User hits `Backspace` in empty field → previous input focused

---

## 💡 Improvements to Consider

- Add support for paste-to-fill-all-OTP fields
- Auto-submit once all fields are filled
- Validation of input on submit

---

## 📌 Summary

This is a clean and minimal implementation of an OTP input UI in React using:

- `useRef()` to handle focus movement
- `useState()` for controlled inputs
- Callback `ref` to assign input DOMs into an array
