// Import useState from react
import { useState, useRef } from "react";

import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css"; // Material Design theme


function TodoList() {

  // STATES
  const [todos, setTodos] = useState([]);
  const [todoItem, setTodoItem] = useState({ desc: "", date: "", priority: null })

  const gridRef = useRef();


  // FUNCTIONS
  const handleChange = (event) => {
    //setDesc(event.target.value);
    setTodoItem({ ...todoItem, [event.target.name]: event.target.value })
  };

  // FUNCTIONS FOR ADDING AND REMOVAL (PASS REMOVE FUNC TO TODOTABLE.JSX)
  const addTodo = () => {
    setTodos([...todos, todoItem]);
  };



  // NEW DELETE FUNCTION
  const handleDelete = () => {
    if (gridRef.current.getSelectedNodes().length > 0) {
      setTodos(todos.filter((todo, index) =>
        index != gridRef.current.getSelectedNodes()[0].id))
    }
    else {
      alert('Select a row first!');
    }
  };


  const [columnDefs, setColumnDefs] = useState([
    { field: 'desc', sortable: false, filter: true, floatingFilter: true },
    { field: 'priority', sortable: true, filter: true, floatingFilter: true, cellStyle: params => params.value === "High" ? { color: 'red' } : { color: 'black' } },
    { field: 'date', sortable: true, filter: true, floatingFilter: true }
  ]);





  // RETURN REACT FRAGMENT
  return (
    <>

      <h1>To-do List Exercise</h1>

      {/* ADD TO-DO ITEM FORM */}
      <p>Add description</p>
      <input
        name="desc"
        value={todoItem.desc}
        onChange={handleChange}
      />
      <p>Add due date</p>
      <input
        name="date"
        value={todoItem.date}
        onChange={handleChange}
      />
      <p>Add priority</p>
      <input
        name="priority"
        value={todoItem.priority}
        onChange={handleChange}
      />

      <br/>
      <br/>
      <button onClick={addTodo}>Add</button>
      <br/>
      <button onClick={handleDelete}>Delete</button>
      <br/>


      {/* TODO-LIST TABLE DISPLAY ELEMENT */}
      <h2>List of Goals:</h2>

      <div className="ag-theme-material" style={{ width: 700, height: 500 }}>
        <AgGridReact
          rowData={todos}
          columnDefs={columnDefs}
          onGridReady={params => gridRef.current = params.api}
          rowSelection="single"
        />
      </div>
    </>
  );
}

export default TodoList;