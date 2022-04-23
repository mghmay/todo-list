import React, { useState, useRef, useEffect } from 'react'; //useEffect is used for storing information in loal storage when the user refreshed the page
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid'; //this provides a unique identifier for each todo item

const LOCAL_STORAGE_KEY = 'todoApp.todos';

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();


  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)); // the json object needs to be parsed before it can be used.
    if (storedTodos.length > 0) {
      setTodos(storedTodos);
    }
    }, []
  )

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos)) //we need to store the item as a json object
    }, [todos]
  )
  
  function toggleTodo(id) {
    const newTodos = [... todos];
    const todo = newTodos.find(todo => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value;
    if (name === '') return;
    setTodos(prevTodos => {
      return [...prevTodos, {id: uuidv4(), name: name, complete: false}]
    }) 
    todoNameRef.current.value = null;
  }
  function handleClearTodos() {;
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos);
  }
  return (
    <>
      <TodoList todos = {todos} toggleTodo = {toggleTodo} />
      <input ref = {todoNameRef}
        type = "text"
      />
      <button onClick={handleAddTodo}>
        Add Todo
      </button>
      <button onClick = {handleClearTodos}>
        Clear Completed Todos
      </button>
      <div>
        {todos.filter(todo => !todo.complete).length} left to do.
      </div>
    </>
  )
}

export default App;
