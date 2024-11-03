'use-client';
import React from 'react';

interface ToDoCardProps {
  id: number;
  title: string;
  content?: string | null;
  completed: boolean;
  onToggleComplete: (id: number) => void;
  onDelete: (id: number) => void;
}

const ToDoCard: React.FC<ToDoCardProps> = ({ id, title, content, completed, onToggleComplete, onDelete }) => {
  return (
    <div className="border rounded shadow p-4 mb-4 bg-white">
      <h3 className={`text-lg font-bold ${completed ? 'line-through' : ''}`}>{title}</h3>
      {content && <p>{content}</p>}
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
  );
};

export default ToDoCard;
