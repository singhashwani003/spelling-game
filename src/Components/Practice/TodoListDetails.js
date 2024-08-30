import React from 'react';
const TodoListDetails = (props) => {
  return (
    <div>
        <div className="app-container" id="taskList">
            <h1 className="app-header">TO DO LIST</h1>
            <div className="add-task">
                <input type="text" autoComplete="off" placeholder="Add New Task" v-model="tasks.name" className="task-input" onChange={props.change} value={props.search}></input>
                <input type="submit" value="" className="submit-task" title="Add Task" onClick={props.data}></input>
            </div>
            <ul className="task-list">
                {props.item.map((currElem, ind) => (
                    <li className="task-list-item" v-for="task in tasks" key={ind}>
                        <label className="task-list-item-label">
                        <input type="checkbox"></input>
                        <span>{currElem}</span>
                        </label>
                        <span className="delete-btn" title="Delete Task" onClick={() => props.delete(ind)}></span>
                    </li>
                ))}
            </ul>
            <div className="d-flex align-items-center justify-content-end">
                <button className="btn btn-danger text-center my-3" onClick={props.remove}>Remove all</button>
            </div>
        </div>
    </div>
  )
}
export default TodoListDetails;
