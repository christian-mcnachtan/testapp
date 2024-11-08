"use-client" 

import React from 'react'

interface FilterBarProps {
    onSortChange: (sortBy: string) => void;  
}

const FilterBar: React.FC<FilterBarProps> = ({ onSortChange }) => {
    return (
      <div className="flex justify-between items-center p-2 mb-4 bg-gray-300 rounded">
        <button onClick={() => onSortChange('priority')} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded">Sort by Priority</button>
        <button onClick={() => onSortChange('date')} className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded">Sort by Date Added</button>
        <button onClick={() => onSortChange('completed')} className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded">Sort by Completed</button>
      </div>
    );
  };
  
  export default FilterBar;