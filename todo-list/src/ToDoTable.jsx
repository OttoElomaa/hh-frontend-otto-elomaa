import React from "react";

function TodoTable(props) {


    // FUNCTION
    const deleteTodoItem = (todoItem) => {

        props.setTodos(props.todos.filter((todo) => todo.desc !== todoItem.desc || todo.date !== todoItem.date))
    };



    return <>
        <table>
            <thead>
                <tr>
                    <th class="rightBorder">Num</th>
                    <th>Description</th>
                    <th>Due Date</th> 
                </tr>
                
            </thead>
            <tbody>
                {props.todos.map((todo, index) => (
                <tr key={index}>
                    <td class="rightBorder">{index + 1}:</td>
                    <td>{todo.desc}</td>
                    <td>{todo.date}</td>
                    <td><button onClick={() => deleteTodoItem(todo) }>Delete</button></td>
                </tr>
                ))}
            </tbody>
        </table>
    </>;
}

export default TodoTable;