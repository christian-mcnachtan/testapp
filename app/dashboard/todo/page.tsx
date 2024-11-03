import React from 'react';
import ToDoList from '@/components/ToDoList'; 
import prisma from '@/utils/prismaClient'; // Adjust path as needed to import Prisma client
import { ToDoItem } from '@/types/types';

const ToDoPage = async () => {
    // Fetch initial to-do data from the database
    const todos = await prisma.todo.findMany();
  
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">To-do List</h1>
        <ToDoList initialTodos={todos} />
      </div>
    );
  };
  
  export default ToDoPage;
