# 🔐 TypeScript `createContext<Type>()` — What It *Really* Does

## ✅ What it DOES do

`createContext<Type>()` is primarily for **TypeScript consumers**. It helps with:

1. **Autocomplete** for `useContext()` consumers.
2. **Type-checking** for consuming components.
3. **Prevents access** to properties not in the defined context type.

Example:

```ts
interface AuthContextType {
  user: User | null;
  login: (data: number) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
```

Now in consumers:

```ts
const { user, login, logout } = useContext(AuthContext)!;

user    ✅ OK
login   ✅ OK
logout  ❌ Error: Property 'logout' does not exist on type 'AuthContextType'
```

---

## ❌ What it DOESN'T do

It does **not enforce** that the object you provide in:

```ts
<AuthContext.Provider value={values}>
```

...actually matches `AuthContextType` — **unless you explicitly type it**.

So this won’t throw an error:

```ts
const values = {
  user,
  login,
  logout: () => {}, // ❌ Not part of AuthContextType
};
```

But this WILL throw an error:

```ts
const values: AuthContextType = {
  user,
  login,
  logout: () => {}, // ❌ TS Error
};
```

---

## 🧠 Best Practices

### ✅ Type the value explicitly
```ts
const value: AuthContextType = { ... };
```

### ✅ Or use `satisfies` for inference + enforcement
```ts
const value = {
  user,
  login,
} as const satisfies AuthContextType;
```

---

## 🔁 Summary

| Thing | Enforced? | Purpose |
|-------|-----------|---------|
| `createContext<Type>()` | ✅ | Gives context consumers autocomplete & type-checking |
| `value={...}` untyped | ❌ | Doesn't validate structure |
| `value: Type = {}` | ✅ | Ensures value matches expected shape |
| `useContext()` access to extra fields | ❌ | Only what's in `Type` is accessible |

---

**Conclusion:** `createContext<Type>()` is powerful for consumers, but it's your job to make sure the value you provide matches `Type`, either by typing it or validating it.