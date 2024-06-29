# Getting Started
Install the dependencies and run the project
```
npm install
npm start
```


# Add to Cart App

The "Add to Cart" app is a simple web application that allows users to add items to a shopping list, view the list in real-time, and remove items from the list. The app uses Firebase Realtime Database to store and retrieve shopping list items.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Files](#files)
- [License](#license)

## Features

- Add items to a shopping list.
- View the shopping list in real-time.
- Remove items from the shopping list.
- Persistent storage using Firebase Realtime Database.

## Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/add-to-cart-app.git
   cd add-to-cart-app
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Start the development server:**
   ```sh
   npm run dev
   ```

## Usage

1. **Open the app in your browser:**
   After starting the development server, open your browser and navigate to `http://localhost:3000`.

2. **Add items to the cart:**
   - Enter an item name in the input field.
   - Click the "Add to cart" button to add the item to the shopping list.

3. **Remove items from the cart:**
   - Click on an item in the shopping list to remove it.

## Files

### index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Add to Cart</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@300&display=swap" rel="stylesheet">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="manifest" href="/site.webmanifest">
    <link rel="stylesheet" href="index.css">
</head>
<body>
    <div class="container">
        <img src="assets/images.jpeg">
        <input type="text" id="input-field" placeholder="Bread">
        <button id="add-button">Add to cart</button>
        <ul id="shopping-list"></ul>
    </div>
    <script src="index.js" type="module"></script>
</body>
</html>
```

### index.css

```css
html, body {
    margin: 0;
    padding: 0;
    font-family: 'Rubik', sans-serif;
    background-color: #EEF0F4;
    user-select: none;
}

.container {
    display: flex;
    flex-direction: column;
    max-width: 320px;
    margin: 30px auto;
}

input {
    color: #432000;
    background-color: #DCE1EB;
    border: 1px solid #965e29;
    text-align: center;
    padding: 10px 0px;
    margin: 15px 0px;
    border-radius: 8px;
    font-size: 20px;
    font-family: 'Rubik', sans-serif;
}

button {
    color: #FDFDFD;
    background-color: #AC485A;
    cursor: pointer;
    text-align: center;
    padding: 10px 0px;
    border-radius: 8px;
    font-size: 20px;
    font-family: 'Rubik', sans-serif;
    box-shadow: 0 9px #999;
    border: none;
}

button:active {
    background-color: #3e8e41;
    box-shadow: 0 5px #666;
    transform: translateY(4px);
}

img {
    width: 200px;
    margin: 0 auto;
}

button:hover {
    background-color: #432000;
    cursor: pointer;
}

ul {
    list-style-type: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

ul li {
    font-size: 20px;
    background-color: #FFFDF8;
    padding: 15px;
    border-radius: 8px;
    flex-grow: 1;
    text-align: center;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);
}

ul li:hover {
    background-color: #FFECC7;
    cursor: pointer;
}
```

### index.js

```javascript
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-7b21c-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingInDB = ref(database, "ShoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    if (inputValue !== "") {
        push(shoppingInDB, inputValue)
        clearInputFieldEl()
    }
})

onValue(shoppingInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemArray = Object.entries(snapshot.val())
        clearShoppingListEl()
        for (let i = 0; i < itemArray.length; i++) {
            let currentItem = itemArray[i]
            appendItemToShoppingList(currentItem)
        }
    } else {
        shoppingListEl.innerHTML = `No items here... yet`
    }
})

function appendItemToShoppingList(item) {
    let itemId = item[0]
    let itemValue = item[1]
    let newEl = document.createElement("li")
    newEl.textContent = itemValue

    newEl.addEventListener("click", function() {
        let exactPositionOnDB = ref(database, `ShoppingList/${itemId}`)
        remove(exactPositionOnDB)
    })

    shoppingListEl.append(newEl)
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}
```

### site.webmanifest

```json
{
    "name": "Add To Cart",
    "short_name": "Add To Cart",
    "icons": [
        {
            "src": "/android-chrome-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
        },
        {
            "src": "/android-chrome-512x512.png",
            "sizes": "512x512",
            "type": "image/png"
        }
    ],
    "theme_color": "#ffffff",
    "background_color": "#ffffff",
    "display": "standalone"
}
```

### package.json

```json
{
    "name": "Add to Cart",
    "scripts": {
        "start": "vite",
        "dev": "vite",
        "build": "vite build",
        "preview": "vite preview"
    },
    "dependencies": {
        "vite": "latest"
    },
    "devDependencies": {}
}
```

### vite.config.js

```javascript
import { defineConfig } from "vite"

export default defineConfig({
    plugins: []
})
```

## License

This project is licensed under the MIT License.

---

This README provides a comprehensive guide for setting up and using the Add to Cart app. Adjust the URLs and project details as necessary based on your specific implementation and repository setup.
