import { useEffect, useState } from 'react';
import { getDatabase } from '../db/database';

export default function FallbackIndicator() {
  const [isFallback, setIsFallback] = useState(false);

  useEffect(() => {
    const checkDatabaseMode = async () => {
      try {
        const db = await getDatabase();
        setIsFallback(!!db.__isFallback);
      } catch (error) {
        console.error('Could not check database mode:', error);
      }
    };
    checkDatabaseMode();
  }, []);

  if (!isFallback) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-yellow-500 text-white px-4 py-2 rounded-md shadow-lg z-50">
      ⚠️ Using temporary database - data won't persist after refresh
    </div>
  );
}