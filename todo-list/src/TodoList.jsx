// Import useState from react
import { useState, useRef } from "react";

import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css"; // Material Design theme
import { Button, MenuItem, Select, TextField } from "@mui/material";

import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import 'dayjs/locale/de';
import 'dayjs/locale/en-gb';


function TodoList() {

  // STATES
  const [todos, setTodos] = useState([]);
  const [todoItem, setTodoItem] = useState({ desc: "", date: dayjs(), priority: "Medium" })

  const [formatDate, setFormatDate] = useState(null);

  const gridRef = useRef();


  // FUNCTIONS
  const handleChange = (event) => {
    //setDesc(event.target.value);
    setTodoItem({ ...todoItem, [event.target.name]: event.target.value })
  };

  // FUNCTIONS FOR ADDING AND REMOVAL (PASS REMOVE FUNC TO TODOTABLE.JSX)
  const addTodo = () => {
    const formatted = dayjs(todoItem.date).format('DD.MM.YYYY')
    setTodos([...todos, {...todoItem, date: formatted}]);
   
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
   


  // COLUMN DEFS CONST INFO
  const [columnDefs, setColumnDefs] = useState([
    {
      field: 'desc',
      sortable: false, filter: true, floatingFilter: true
    },
    {
      field: 'priority', sortable: true, filter: true, floatingFilter: true,
      cellStyle: params => params.value === "High" ? { color: 'red' } : { color: 'black' }
    },
    {
      field: 'date',
      sortable: true, filter: true, floatingFilter: true
    }
  ]);





  // RETURN REACT FRAGMENT
  return (
    <>

      <h1>To-do List Exercise</h1>

      {/* ADD TO-DO ITEM FORM */}
      <p>Description - Priority - Due date</p>

      <TextField
        type="text"
        label="Description"
        name="desc"
        value={todoItem.desc}
        onChange={handleChange}
      />

      <Select
        type="text"
        label="Priority"
        name="priority"
        value={todoItem.priority}
        onChange={handleChange}>

        <MenuItem value="Low">Low</MenuItem>
        <MenuItem value="Medium">Medium</MenuItem>
        <MenuItem value="High">High</MenuItem>
      </Select>

      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en-gb'>
        <DatePicker
          label="Date"
          value={todoItem.date}
          onChange={(newValue) => setTodoItem({ ...todoItem, date: newValue })}
        />
      </LocalizationProvider>


      <br />
      <br />
      <Button
        variant="outlined"
        onClick={addTodo}>Add</Button>
      <br />
      


      {/* TODO-LIST TABLE DISPLAY ELEMENT */}
      <h2>List of Goals:</h2>

      <div className="ag-theme-material" style={{ width: 700 }}>
        <AgGridReact
          rowData={todos}
          columnDefs={columnDefs}
          onGridReady={params => gridRef.current = params.api}
          rowSelection="single"
          domLayout='autoHeight'
        />
      </div>

      <br />
      <br />
      <Button
        variant="outlined"
        onClick={handleDelete}>Delete Selected</Button>
    </>
  );
}

export default TodoList;