// Simple in-memory database fallback
const patients = [];
let idCounter = 1;

export const fallbackDB = {
  async query(query, params) {
    console.warn("Using fallback database");
    
    // SELECT all patients
    if (query.includes("SELECT * FROM patients")) {
      return [...patients];
    }
    
    // INSERT new patient
    if (query.includes("INSERT INTO patients")) {
      const newPatient = {
        id: idCounter++,
        first_name: params[0],
        last_name: params[1],
        date_of_birth: params[2],
        gender: params[3],
        email: params[4] || null,
        phone: params[5] || null,
        address: params[6] || null,
        created_at: new Date().toISOString()
      };
      patients.push(newPatient);
      return [newPatient];
    }
    
    return [];
  },
  __isFallback: true
};