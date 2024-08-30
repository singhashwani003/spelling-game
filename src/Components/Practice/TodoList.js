import React, { useState } from 'react';
import "./Todolist.css";
import TodoListDetail from './TodoListDetails';
const TodoList = () => {
const [search , setSearch] = useState("");
const [item , setItem] = useState([]);
const setData = () => {
    if(!search){

    }else{
        setItem([...item , search]);
        console.error(setItem);
        setSearch("");
    }
};
const removeItem = () => {
  setItem([]);
};
const deleteItem = (ind) => {
  const updateItem = item.filter((curr , index) =>{
        return index !== ind;
   });
   console.error(updateItem);
   setItem(updateItem);
};
  return (
    <div>
        <TodoListDetail 
        change={(event) => setSearch(event.target.value)} 
        search={search}
        data={() => setData()}
        item={item}
        delete={deleteItem}
        remove={removeItem}
        />
    </div>
  )
}
export default TodoList;
