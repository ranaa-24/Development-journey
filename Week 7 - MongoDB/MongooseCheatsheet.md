# 📦 Mongoose Cheat Sheet – Most Useful Methods

## 🔍 Query & Read Methods

| Method                   | Description                             |
| ------------------------ | --------------------------------------- |
| `find(query)`            | Returns **all** matching documents      |
| `findOne(query)`         | Returns the **first** matching document |
| `findById(id)`           | Finds a document by `_id`               |
| `countDocuments(query)`  | Counts how many match a condition       |
| `exists(query)`          | Checks if at least one document exists  |
| `distinct(field, query)` | Gets unique values for a field          |

---

## ✍️ Create / Insert Methods

| Method               | Description                    |
| -------------------- | ------------------------------ |
| `create(doc)`        | Adds a new document            |
| `insertMany([docs])` | Inserts **multiple** documents |

---

## ✏️ Update Methods

| Method                                     | Description                              |
| ------------------------------------------ | ---------------------------------------- |
| `updateOne(query, update)`                 | Updates the **first** match              |
| `updateMany(query, update)`                | Updates **all** matching docs            |
| `findOneAndUpdate(query, update, options)` | Finds and updates a document, returns it |
| `findByIdAndUpdate(id, update, options)`   | Updates a document by `_id`              |

> 🔹 Tip: Use `new: true` to return updated doc  
> 🔹 Tip: Use `runValidators: true` to apply schema rules

---

## 🗑️ Delete Methods

| Method                    | Description                  |
| ------------------------- | ---------------------------- |
| `deleteOne(query)`        | Deletes the **first** match  |
| `deleteMany(query)`       | Deletes **all** matches      |
| `findOneAndDelete(query)` | Finds and deletes a document |
| `findByIdAndDelete(id)`   | Deletes by `_id`             |

---

## 🛠️ Schema Utilities

| Method       | Description                                                |
| ------------ | ---------------------------------------------------------- |
| `save()`     | Saves a new or modified document                           |
| `validate()` | Validates without saving                                   |
| `toObject()` | Converts a Mongoose doc to a plain object                  |
| `lean()`     | Returns plain JS objects instead of Mongoose docs (faster) |

---

## 🔧 Query Options / Helpers

| Option                | Description                                    |
| --------------------- | ---------------------------------------------- |
| `.select('field')`    | Include only certain fields                    |
| `.sort({ field: 1 })` | Sort by field (1 = asc, -1 = desc)             |
| `.limit(n)`           | Limit number of results                        |
| `.skip(n)`            | Skip a number of results (pagination)          |
| `.populate('field')`  | Replace ObjectId with full referenced document |

---

## 🧠 Example Query

```js
Course.find({ price: { $gt: 10 } })
  .select("title price")
  .sort({ price: -1 })
  .limit(5)
  .lean();
```

## 🔍 Step-by-Step Explanation

### ✅ 1. `Course.find({ price: { $gt: 10 } })`

- Filters documents where the `price` is **greater than 10**
- `$gt` = "greater than" (MongoDB operator)
- Other operators: `$lt`, `$gte`, `$lte`, `$in`, etc.

---

### ✅ 2. `.select('title price')`

- Selects only the `title` and `price` fields from each document.
- Reduces the amount of data returned.
- Tip: Use `-fieldName` to exclude a field, e.g., `.select('-_id title price')`.

---

### ✅ 3. `.sort({ price: -1 })`

- Sorts results by `price` in **descending order** (`-1`)
- Use `1` for **ascending order**

---

### ✅ 4. `.limit(5)`

- Limits the result to only **5 documents**
- Commonly used for pagination or top-N lists

---

### ✅ 5. `.lean()`

- Converts the Mongoose documents into **plain JavaScript objects**
- Improves **read performance**
- You **can't use Mongoose features** like `.save()` on lean results

---

## 🧠 Final Output Example

```json
[
  { "title": "React Mastery", "price": 99 },
  { "title": "Node.js Pro", "price": 89 },
  ...
]
```

---

## ✅ Use Case Summary

> “Get top 5 most expensive courses where price > 10, and return only their title and price.”
