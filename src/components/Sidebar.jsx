import React from 'react';
import { User, Database, FileSql } from '@phosphor-icons/react';

export default function Sidebar({ activeTab, setActiveTab }) {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-4 flex flex-col">
      <div className="mb-8 p-4">
        <h1 className="text-xl font-bold text-gray-800">Patient Registration</h1>
      </div>
      
      <nav className="flex-1">
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => setActiveTab('register')}
              className={`w-full flex items-center p-3 rounded-lg ${activeTab === 'register' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <User size={20} className="mr-3" />
              <span>Patient Registration</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab('query')}
              className={`w-full flex items-center p-3 rounded-lg ${activeTab === 'query' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <FileSql size={20} className="mr-3" />
              <span>SQL Query</span>
            </button>
          </li>
        </ul>
      </nav>
      
      <div className="p-4 text-sm text-gray-500">
        <p>PGlite Database</p>
        <p className="flex items-center mt-1">
          <Database size={16} className="mr-2" />
          <span>In-browser Postgres</span>
        </p>
      </div>
    </aside>
  );
}