'use-client';
import React from 'react';

interface ToDoCardProps {
  id: number;
  title: string;
  created: Date;
  content?: string | null;
  priority: boolean;
  completed: boolean;
  onToggleComplete: (id: number) => void;
  onTogglePriority: (id: number) => void;
  onDelete: (id: number) => void;
}

const ToDoCard: React.FC<ToDoCardProps> = ({ id, title, created, content, priority, completed, onToggleComplete, onTogglePriority, onDelete }) => {
  return (
    <div className="border rounded shadow p-4 mb-4 bg-white">
      <div className="flex justify-between items-center">
        <h2 className={`text-xl font-bold ${completed ? 'line-through' : ''}`}>{title}</h2>
        
      
       <h3 className="text-sm text-gray-500">Created: {new Date(created).toLocaleDateString()}</h3>
       <h3><span className="text-md font-bold">Priority: </span>
       <button 
       className={`mt-2 px-3 py-1 text-white rounded  ${priority ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-orange-500 hover:bg-orange-600'}`}
        onClick={() => onTogglePriority(id)}> 
        {priority ? 'Low' : 'High'}
        </button></h3>
      </div>
      < hr />
      < br />
      <div className="max-w-3xl mx-auto">
      {content && <p>{content}</p>}
      </div>
      <br />
      <hr />
      <div className="flex justify-between items-center">
      <button
        className="mt-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
        onClick={() => onToggleComplete(id)}
      >
        {completed ? 'Mark as Incomplete' : 'Mark as Complete'}
      </button>
      <button
        className="mt-2 ml-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        onClick={() => onDelete(id)}
      >
        Delete
      </button>
    </div>
    </div>
  );
};

export default ToDoCard;
