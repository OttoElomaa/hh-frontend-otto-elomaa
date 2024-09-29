// Import useState from react
import { useState } from "react";
import './ToDoList.css'
import TodoTable from "./ToDoTable";

function TodoList() {

    // STATES
    const [todos, setTodos] = useState([]);
    const [todoItem, setTodoItem] = useState({desc: "", date: ""})


    // FUNCTIONS
    const handleChange = (event) => {
        //setDesc(event.target.value);
        setTodoItem({ ...todoItem, [event.target.name]: event.target.value})
      };
      
    // FUNCTIONS FOR ADDING AND REMOVAL (PASS REMOVE FUNC TO TODOTABLE.JSX)
    const addTodo = () => {
      setTodos([...todos, todoItem]);
    };

    // FUNCTION
    const deleteTodoItem = (todoItem) => {

      setTodos(todos.filter((todo) => todo.desc !== todoItem.desc || todo.date !== todoItem.date))
    };

 

    // RETURN REACT FRAGMENT
    return(
        <>

        <h1>To-do List Exercise</h1>

        <p>Add description</p>
        <input name="desc" value={todoItem.desc} onChange={handleChange}  />
        <p>Add due date</p>
        <input name="date" value={todoItem.date} onChange={handleChange}  />
        <button onClick={addTodo}>Add</button> 

        <h2>List of Goals:</h2>
        <TodoTable todos={todos} deleteTodoItem={deleteTodoItem}/>
        </>
    );
  }
  
  export default TodoList;