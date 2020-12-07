// Light theme

// Variables
const button = document.querySelector("[data-theme]");
const wrapper = document.querySelector(".wrapper");

// Implement
const changeTheme = (e) => {
    const paths = {
        0:"./images/icon-sun.svg",
        1:"./images/icon-moon.svg"
    }

    const path = e.target.classList.toggle("active");
    if(path){
        e.target.setAttribute("src",paths[1]);
        wrapper.classList.add("light");
        
    }else{
        e.target.setAttribute("src",paths[0]);
        wrapper.classList.remove("light");
    }
    console.log(wrapper);
}
// Event Listener
button.addEventListener('click',changeTheme);

// TODO APP

class Todo{
    constructor(todo){
        this.todo=todo;
        this.getItems();
    }
    addTodo(task){
        this.todo=task;
        const todoList = document.querySelector("[data-list]");
        const div = document.createElement('div');
        div.classList.add("main__list-todo");
        div.dataset.complete="no";
        div.innerHTML=`<button class="main__list-todo-btn" data-check></button><p>${this.todo}</p><button class="main__list-todo-delete" data-deletebtn><img src="../../images/icon-cross.svg" alt="todo-delete"></button>`;
        todoList.appendChild(div);
    }
    clearInput(){
        const input = document.querySelector("[data-add]");
        input.value="";
    }
    getItems(){
        const todoList = document.querySelector("[data-list]");
        const items = document.querySelector("[data-items]");

        items.innerHTML = `${todoList.children.length} items left`;
        return `${todoList.children.length} items left`;
    }
    delete(){
        const deletebtn = [...document.querySelectorAll("[data-deletebtn]")];
        deletebtn.forEach((button) => {
            button.addEventListener("click",(e) => {
                e.target.closest(".main__list-todo").remove();
                this.getItems();
                const arr = story.getFromStory();
                const deleteElement = arr.splice(deletebtn.indexOf(e.target.parentElement),deletebtn.indexOf(e.target.parentElement)+1);
                localStorage.setItem("storageItems",JSON.stringify(arr));
            })
        });
    }
    isComplete(){
        const complete = document.querySelectorAll("[data-check]");
        complete.forEach((element) => {
            element.addEventListener('click',(e) => {
                e.target.closest(".main__list-todo").dataset.complete = "complete";
            })
        })
    }
}
class Story{
    getFromStory(){
        let storageTodo;
        if(localStorage.getItem("storageItems") === null){
            storageTodo=[];
        }else{
            storageTodo=JSON.parse(localStorage.getItem("storageItems"));
        }
        return storageTodo;
    }
    addStory(task){
        let storageTasks = this.getFromStory();
        storageTasks.push(task);
        localStorage.setItem("storageItems",JSON.stringify(storageTasks));
    }
}

// Variables

const form = document.querySelector("[data-todo]");
const succes = document.querySelector("[data-succesful]");
const items = document.querySelector("[data-items]");
const completed = document.querySelector("[data-completed]");
const active = document.querySelector("[data-active]");
const all = document.querySelector("[data-all]");


const todoApp = new Todo();
const story = new Story();

// Event Listener

document.addEventListener('DOMContentLoaded',() => {
    const storageItems = story.getFromStory();
    storageItems.forEach((item) => {
        todoApp.addTodo(item);
    })
});

all.addEventListener('click',() => {
    const completedItems = [...document.querySelectorAll("[data-complete='complete']")];
    const uncompletedItems = [...document.querySelectorAll("[data-complete='no']")];
    completedItems.forEach((item) => {
        item.style.display="flex";
    })
    uncompletedItems.forEach((item) => {
        item.style.display="flex";
    })
})
active.addEventListener('click',() => {
    const completedItems = [...document.querySelectorAll("[data-complete='complete']")];
    const uncompletedItems = [...document.querySelectorAll("[data-complete='no']")];
    completedItems.forEach((item) => {
        item.style.display="none";
    })
    uncompletedItems.forEach((item) => {
        item.style.display="flex";
    })
})

completed.addEventListener('click',() => {
    const completedItems = [...document.querySelectorAll("[data-complete='complete']")];
    const uncompletedItems = [...document.querySelectorAll("[data-complete='no']")];
    uncompletedItems.forEach((item) => {
        item.style.display="none";
    })
    completedItems.forEach((item) => {
        item.style.display="flex";
    })
})

form.addEventListener('submit',(e) => {
    e.preventDefault();
    const value = e.target.children[1].value;
    if(value){
        todoApp.addTodo(value);
        story.addStory(value);
        todoApp.clearInput();
        todoApp.isComplete();
        items.innerHTML=todoApp.getItems();
        succes.style.backgroundColor="green";
        todoApp.delete();
    }else{
        succes.style.backgroundColor="red";
    }
})