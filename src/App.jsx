import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getDatabase , executeQuery } from './db/database';
import Sidebar from './components/Sidebar';
import PatientForm from './components/PatientForm';
import PatientList from './components/PatientList';

export default function App() {
  const [patients, setPatients] = useState([]);
  const [dbReady, setDbReady] = useState(false);

  useEffect(() => {
  const initApp = async () => {
    try {
      // First test connection
      await executeQuery("SELECT 1");
      setDbReady(true);
      loadPatients();
    } catch (error) {
      toast.error("Database initialization failed. Please refresh the page.");
      console.error("Initialization error:", error);
      // Consider implementing a retry mechanism here
    }
  };
  initApp();
}, []);

  const loadPatients = async () => {
    try {
      const result = await executeQuery(
        "SELECT * FROM patients ORDER BY created_at DESC"
      );
      setPatients(result);
    } catch (error) {
      toast.error("Failed to load patients");
      console.error("Load Error:", error);
    }
  };

  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        {dbReady ? (
          <>
            <PatientForm onPatientAdded={loadPatients} />
            <PatientList patients={patients} />
          </>
        ) : (
          <div className="loading-indicator">
            Initializing database...
          </div>
        )}
      </main>
      <ToastContainer position="bottom-right" />
    </div>
  );
}