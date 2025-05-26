import React from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
// import { executeQuery } from '../db/database';
import * as db from '../db/database';
console.log(db);

export default function QueryPanel() {
  const [query, setQuery] = useState('SELECT * FROM patients LIMIT 10');
  const [results, setResults] = useState([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionTime, setExecutionTime] = useState(null);

  const handleExecute = async () => {
    if (!query.trim()) {
      toast.error('Please enter a SQL query');
      return;
    }

    setIsExecuting(true);
    setExecutionTime(null);
    
    try {
      const startTime = performance.now();
      const result = await executeQuery(query);
      const endTime = performance.now();
      
      setExecutionTime(((endTime - startTime) / 1000).toFixed(4));
      setResults(result);
      toast.success('Query executed successfully');
    } catch (error) {
      console.error('Query execution error:', error);
      toast.error(`Query error: ${error.message}`);
      setResults([]);
    } finally {
      setIsExecuting(false);
    }
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setExecutionTime(null);
  };

  return (
    <div className="space-y-6">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">SQL Query Editor</h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="sqlQuery">Enter your SQL query</label>
            <textarea
              id="sqlQuery"
              rows="5"
              className="w-full p-3 font-mono text-sm border border-gray-300 rounded-lg"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="SELECT * FROM patients;"
            />
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={handleExecute}
              disabled={isExecuting}
              className="btn-primary flex items-center"
            >
              {isExecuting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Executing...
                </>
              ) : 'Execute Query'}
            </button>
            
            <button
              onClick={handleClear}
              className="btn-secondary"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
      
      {executionTime !== null && (
        <div className="text-sm text-gray-500">
          Query executed in {executionTime} seconds
        </div>
      )}
      
      {results.length > 0 && (
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Query Results ({results.length} rows)</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {Object.keys(results[0]).map((column) => (
                    <th
                      key={column}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {results.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {Object.values(row).map((value, colIndex) => (
                      <td
                        key={colIndex}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                      >
                        {value !== null ? String(value) : 'NULL'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}