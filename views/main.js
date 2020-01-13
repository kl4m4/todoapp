//import {createLInode} from './lib/todolist.mjs';

var todo_array = [
    {
        itemuid: 123,
        itemtitle: 'asdasdsa',
        itemdescription: 'qwerty',
        itemurgent: false,
    },
    {
        itemuid: 124,
        itemtitle: 'asdas5t54dsa',
        itemdescription: 'qwertyet54svt',
        itemurgent: true,
    },
    {
        itemuid: 125,
        itemtitle: 'asdasdsafwrf',
        itemdescription: 'qwertyte45ty4e5',
        itemurgent: false,
    },
]

FetchTODOData();
//RenderToDoArray(todo_array);

function FetchTODOData(){
    axios.get('http://localhost:3000/api/todos')
        .then(response => {
            //console.log(response.data);    
            todo_array = response.data;
            RenderToDoArray(todo_array);
        })
        .catch(err => {
            console.log(err);
        });
}

function RenderToDoArray(todos){
    var listElement = document.getElementById("todolist-ul");
    todos.forEach(element => {
        var newnode = createLInode(element, {toolbar: true, toolbarvisible: true});
        listElement.appendChild(newnode);        
    });   
}

function MouseOver(itemuid){
    console.log(`Mouse over item ${itemuid}`);
}

function MouseOut(itemuid){
    console.log(`Mouse out of item ${itemuid}`);
}

function EditItem(itemuid){
    console.log(`Editing item ${itemuid}`);
}

function DeleteItem(itemuid){
    console.log(`Deleting item ${itemuid}`);
}

