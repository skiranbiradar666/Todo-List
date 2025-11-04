const cl = console.log;

const todoForm = document.getElementById('todoForm');
const todoList = document.getElementById('todoList');
const todoItemControl = document.getElementById('todoItem');
const addTodoBtn = document.getElementById('addTodoBtn');
const updateTodoBtn = document.getElementById('updateTodoBtn');



let todoArr;
 
    if(localStorage.getItem('todoArr')){
        todoArr = JSON.parse(localStorage.getItem('todoArr'));
    }else{
         todoArr = [];
     }
    


const uuid = () => {
  return String('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx').replace(
    /[xy]/g,
    character => {
      const random = (Math.random() * 16) | 0
      const value = character === 'x' ? random : (random & 0x3) | 0x8
      return value.toString(16)
    }
  )
}

const createLists = (arr)=>{
    let result = '';
    arr.forEach(todo =>{
        
        result += `<li class="list-group-item d-flex justify-content-between" id="${todo.todoId}">
                                    <strong>${todo.todoItem}</strong>
                                    <div>
                                        <i class="fa-solid fa-pen-to-square text-success" onclick="onEdit(this)"></i>
                                        <i class="fa-solid fa-trash text-danger" onclick="onRemove(this)"></i>
                                    </div>
                                </li>`
    })

    todoList.innerHTML = result;

    
}
createLists(todoArr);

const onEdit =(ev) =>{
    let Edit_Id = ev.closest('li').id;
    cl(Edit_Id);

    let Edit_Obj = todoArr.find(todo => todo.todoId === Edit_Id);

    cl(Edit_Obj);
    localStorage.setItem("EditId", Edit_Id);


    todoItemControl.value = Edit_Obj.todoItem;

    updateTodoBtn.classList.remove('d-none');
    addTodoBtn.classList.add('d-none');


}

const onRemove = (ele)=>{

    Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  
  
    if (result.isConfirmed) {

    let Remove_Id = ele.closest('li').id;
    cl(Remove_Id);

    let getIndex = todoArr.findIndex(todo =>{
        return todo.todoId === Remove_Id;

    })
    cl(getIndex);

    let remove_obj = todoArr[getIndex];

    todoArr.splice(getIndex, 1);

    localStorage.setItem("todoarr", JSON.stringify(todoArr));

    ele.closest('li').remove();

    swal.fire({
        title : `TodoItem ${remove_obj.todoItem} Removed Successfully `,
        icon : 'success',
        timer : 3000
    })
    
  }
});

    
}





const onTodoAdd = (ele) =>{
    ele.preventDefault();

    let todoObj = {
        todoItem : todoItemControl.value,
        todoId : uuid(),
    }
    cl(todoObj);
    todoForm.reset();

    todoArr.unshift(todoObj);
    cl(todoArr);

    localStorage.setItem("todoArr", JSON.stringify(todoArr));

   // createLists(todoArr);

   let li = document.createElement('li');
   li.id = todoObj.todoId;
   li.className = "list-group-item d-flex justify-content-between";
   li.innerHTML = `
                    <strong>${todoObj.todoItem}</strong>
                    <div>
                        <i class="fa-solid fa-pen-to-square text-success" onclick="onEdit(this)"></i>
                        <i class="fa-solid fa-trash text-danger" onclick="onRemove(this)"></i>
                    </div>
                        `
                    
    todoList.prepend(li);
    swal.fire({
        title : 'New Todo item added successfully !!!',
        icon : 'success',
        timer : 3000
    })                    



}

const onTodoUpdate = () =>{
    let Update_Id = localStorage.getItem('EditId');
    cl(Update_Id);

    let Update_obj = {
        todoItem : todoItemControl.value,
        todoId : Update_Id,
    }
    cl(Update_obj);

    todoForm.reset();

    let getIndex = todoArr.findIndex(todo => todo.todoId === Update_Id);
    cl(getIndex);

    todoArr[getIndex] = Update_obj;

    localStorage.setItem("todoArr", JSON.stringify(todoArr));

    let li = document.getElementById(Update_Id);
    li.firstElementChild.innerHTML = Update_obj.todoItem;

    updateTodoBtn.classList.add('d-none');
    addTodoBtn.classList.remove('d-none');

    swal.fire({
        title : ' Todo item Updated successfully !!!',
        icon : 'success',
        timer : 3000
    })                    


}

updateTodoBtn.addEventListener("click", onTodoUpdate)
todoForm.addEventListener("submit", onTodoAdd);