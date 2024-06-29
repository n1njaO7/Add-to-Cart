import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push , onValue , remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL : "https://realtime-database-7b21c-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingInDB = ref(database , "ShoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    if(inputValue!="")
    {
        push(shoppingInDB , inputValue)
        clearInputFieldEl()
    }
    
})

onValue(shoppingInDB, function(snapshot){
    if (snapshot.exists())
    {
        let itemArray = Object.entries(snapshot.val())
        clearShoppingListEl()
        for(let i = 0 ; i<itemArray.length;i++)
        {
            let currentItem = itemArray[i]
            
            appendItemToShoppingList(currentItem)

        }
               
    } else {
        shoppingListEl.innerHTML = `No items here... yet`
    }
})



function appendItemToShoppingList(item)
{
    let itemId = item[0]
    let itemValue = item[1]
    let newEl = document.createElement("li")
    newEl.textContent = itemValue

    newEl.addEventListener("click",function(){
        let exactPositionOnDB = ref(database,`ShoppingList/${itemId}`)
        remove(exactPositionOnDB)
    })


    shoppingListEl.append(newEl)
}
function clearInputFieldEl()
{
    inputFieldEl.value = ""
}
function clearShoppingListEl()
{
    shoppingListEl.innerHTML=""
}






