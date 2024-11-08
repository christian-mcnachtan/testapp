'use client';
import React, { useState, useEffect } from 'react';
import ToDoCard from './ToDoCard';
import { ToDoItem } from '@/types/types'; // Adjust path as needed
import FilterBar from './FilterBar';

interface ToDoListProps {
    initialTodos: ToDoItem[];
  }
  
  const ToDoList: React.FC<ToDoListProps> = ({ initialTodos }) => {
    const [todos, setTodos] = useState<ToDoItem[]>(initialTodos);
    const [newToDo, setNewToDo] = useState({ title: '', content: '' });
    const [sortCriteria, setSortCriteria] = useState<string>('date');
    const [sortedTodos, setSortedTodos] = useState<ToDoItem[]>([]);

    useEffect(() => {
      const sorted = [...todos].sort((a, b) => {
        if (sortCriteria === 'priority') {
          return a.priority === b.priority ? 0 : a.priority ? 1 : -1;
        } else if (sortCriteria === 'completed') {
          return a.completed === b.completed ? 0 : a.completed ? 1 : -1;
        } else {
          return new Date(a.created).getTime() - new Date(b.created).getTime();
        }
      });
      setSortedTodos(sorted);
    }, [sortCriteria, todos]);

  
    const handleAddToDo = async () => {
        if (!newToDo.title.trim() || !newToDo.content.trim()) return;
  
      // Create new to-do item
      const newToDoItem = {
        title: newToDo.title,
        completed: false,
        priority: false,
        content: newToDo.content, 
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
        setNewToDo({ title: '', content: '' });
      } catch (error) {
        console.error('Error adding to-do:', error);
      }
    };

    const handleSortChange = (criteria: string) => {
      setSortCriteria(criteria);
    };

  

    const handleToggleComplete = async (id: number) => {
      const toDoTogle = todos.find(todo => todo.id === id);
        if (!toDoTogle) return;

        try {
          const response = await fetch(`/api/todos/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ completed: !toDoTogle.completed }),
          });

          if (response.ok) {
            setTodos(prevTodos =>
              prevTodos.map(todo =>
                todo.id === id ? { ...todo, completed: !todo.completed} : todo
              )
            );
          } else {
            console.error('Failed to mark as complete');
          }
        } catch (error) {
          console.error('Error marking to-do as complete:', error);
        }
      };

      const handleTogglePriority = async (id: number) => {
        const toDoTogle = todos.find(todo => todo.id === id);
        if (!toDoTogle) return;

        try {
          const response = await fetch(`/api/todos/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ priority: !toDoTogle.priority }),
          });

          if (response.ok) {
            setTodos(prevTodos =>
              prevTodos.map(todo =>
                todo.id === id ? { ...todo, priority: !todo.priority } : todo
              )
            );
          } else {
            console.error('Failed to mark as priority');
          }
        } catch (error) {
          console.error('Error marking to-do as priority:', error);
        }
      }
      
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
      <div className="w-1/2 mx-auto">
        
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter new to-do title"
            value={newToDo.title}
            onChange={(e) => setNewToDo({ ...newToDo, title: e.target.value })}
            className="border rounded p-2 mr-2"
          />
          <input
            type="text"
            placeholder="description"
            value={newToDo.content}
            onChange={(e) => setNewToDo({ ...newToDo, content: e.target.value })}
            className="border rounded p-2 mr-2"
          />
          <button onClick={handleAddToDo} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded">
            Add ToDo
          </button>
        </div>
        <h2 className="text-3xl font-bold">To Do List</h2>
        <FilterBar onSortChange={handleSortChange} />
        {sortedTodos.map(todo => (
          <ToDoCard
            key={todo.id}
            id={todo.id}
            title={todo.title}
            created={todo.created}
            content={todo.content}
            priority={todo.priority}
            completed={todo.completed}
            onToggleComplete={() => handleToggleComplete(todo.id)}
            onTogglePriority={() => handleTogglePriority(todo.id)}
            onDelete={() => handleDelete(todo.id)}
          />
        ))}
      </div>
    );
  };
  
  export default ToDoList;

