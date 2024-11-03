'use client';
import React, { useState } from 'react';
import ToDoCard from './ToDoCard';
import { ToDoItem } from '@/types/types'; // Adjust path as needed

interface ToDoListProps {
    initialTodos: ToDoItem[];
  }
  
  const ToDoList: React.FC<ToDoListProps> = ({ initialTodos }) => {
    const [todos, setTodos] = useState<ToDoItem[]>(initialTodos);
    const [newToDo, setNewToDo] = useState<string>('');
  
    const handleAddToDo = async () => {
      if (!newToDo.trim()) return;
  
      // Create new to-do item
      const newToDoItem = {
        title: newToDo,
        completed: false,
        content: '', // Adjust as needed
      };
  
      try {
        const response = await fetch('/api/todos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newToDoItem),
        });
  
        const createdToDo = await response.json();
        setTodos([...todos, createdToDo]);
        setNewToDo('');
      } catch (error) {
        console.error('Error adding to-do:', error);
      }
    };

    const handleToggleComplete = async (id: number) => {
        try {
          const response = await fetch(`/api/todos/${id}`, {
            method: 'PUT',
          });
          if (response.ok) {
            setTodos(prevTodos =>
              prevTodos.map(todo =>
                todo.id === id ? { ...todo, completed: true } : todo
              )
            );
          } else {
            console.error('Failed to mark as complete');
          }
        } catch (error) {
          console.error('Error marking to-do as complete:', error);
        }
      };
      
      const handleDelete = async (id: number) => {
        try {
          const response = await fetch(`/api/todos/${id}`, {
            method: 'DELETE',
          });
          if (response.ok) {
            setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
          } else {
            console.error('Failed to delete to-do');
          }
        } catch (error) {
          console.error('Error deleting to-do:', error);
        }
      };




  
    return (
      <div>
        
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter new to-do"
            value={newToDo}
            onChange={(e) => setNewToDo(e.target.value)}
            className="border rounded p-2 mr-2"
          />
          <button onClick={handleAddToDo} className="bg-blue-500 text-white px-3 py-2 rounded">
            Add ToDo
          </button>
        </div>
        {todos.map(todo => (
          <ToDoCard
            key={todo.id}
            id={todo.id}
            title={todo.title}
            content={todo.content}
            completed={todo.completed}
            onToggleComplete={() => handleToggleComplete(todo.id)}
            onDelete={() => handleDelete(todo.id)}
          />
        ))}
      </div>
    );
  };
  
  export default ToDoList;

