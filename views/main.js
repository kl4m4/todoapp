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
            console.log(":(");
        });
}

function RenderToDoArray(todos){
    //let innerTxt = "";
    var listElement = document.getElementById("todolist-ul");
    todos.forEach(element => {
        //console.log(itemTemplate, 'itemuid'+element.itemuid, 'itemclass', element.itemtitle + ': '+element.itemdescription);
        //var resolvedTemplate = itemTemplate
        //innerTxt = innerTxt + (itemTemplate, 'itemuid'+element.itemuid, 'itemclass', element.itemtitle + ': '+element.itemdescription) 
        var newnode = document.createElement("LI");
        newnode.setAttribute("itemuid", element.itemuid);
        newnode.setAttribute("class", "todoitem");
        newnode.setAttribute("onmouseover", `MouseOver(${element.itemuid})`);
        newnode.innerHTML = "<div class='todoitem-title'>" + element.itemtitle + "</div><div class='todoitem-desc'>" +element.itemdescription + "</div>";
        listElement.appendChild(newnode);        
    });   
}

function MouseOver(itemuid){
    console.log(`Mouse over item ${itemuid}`);
}