import React from 'react';
import ToDoList from '@/components/ToDoList'; 
import prisma from '@/prisma/db'; 


const ToDoPage = async () => {
    
    const todos = await prisma.todo.findMany();
  
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">To-do List</h1>
        <ToDoList initialTodos={todos} />
      </div>
    );
  };
  
  export default ToDoPage;
