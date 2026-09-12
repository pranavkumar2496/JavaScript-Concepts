//1.  select the operational elm 
const taskInput = document.getElementById("task-input")
const createBtn = document.getElementById("add-Btn")

const todoListCont = document.getElementById("list")

//2. initial setup
const todoData = [
    {
        name: "Wake up at 7:00 AM",
        status: true
    },
    {
        name: "Drink 2 glasses of water",
        status: false
    },
    {
        name: "Complete Python practice",
        status: false
    },
    {
        name: "Go to the gym",
        status: false
    },
    {
        name: "Finish today's assignment",
        status: false
    },
    {
        name: "Read for 30 minutes",
        status: false
    },
    {
        name: "Clean my room",
        status: false
    },
    {
        name: "Reply to important messages",
        status: false
    },
    {
        name: "Prepare for tomorrow's interview",
        status: false
    },
    {
        name: "Sleep before 11:00 PM",
        status: false
    }
];

todoData.forEach(function (List) {
    console.log(List.name)
})

function createList(taskName){
    let newList = document.createElement("li")
    newList.classList.add("todo-item")
    newList.innerHTML = `<h1> ${taskName} </h1>
    newList.addEventListener("click", ()=>{
        console.log("clicked")
    });
    todoListCont.append(newList)
}

createList("drink water")

createBtn.addEventListener("click", () => {
    alert(taskInput.value);
}   )