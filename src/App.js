import React, { useState, useEffect } from 'react';
import axios from 'axios';





const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('/todos');
      setTodos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addTodo = async () => {
    try {
      await axios.post('/todos', { task: newTodo });
      setNewTodo('');
      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };

  const updateTodo = async (id, task, completed) => {
    try {
      await axios.put(`/todos/${id}`, { task, completed });
      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`/todos/${id}`);
      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={addTodo} class="btn btn-primary">Add Todo</button>
      </div>
      <div class="card" style={{width: 18 + 'rem'}}>
      <ul class="list-group list-group-flush">
        
        {todos.map((todo) => (
          <p style={{fontSize: 30+ 'px'}}>
          <li key={todo.id} class="list-group-item">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={(e) => updateTodo(todo.id, todo.task, e.target.checked)}
            />
            
            {todo.task}
            
            <span onClick={() => deleteTodo(todo.id)} style={{cursor: 'pointer'}} >
            <svg style={{marginLeft:  20+ 'px'}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"  class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
</svg>
            </span>
          </li>
          </p>
        ))}
      </ul>
      </div>
    </div>
  );
};

export default App;
