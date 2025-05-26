Patient Registration App with PGlite
A frontend-only patient registration application using PGlite (PostgreSQL in the browser) for data storage. This app allows users to register patients, view patient records, and execute raw SQL queries, with all data persisted in the browser's IndexedDB.

Features
Patient Registration: Add new patients with comprehensive details

Patient Records: View all registered patients in a tabular format

SQL Query Interface: Execute raw SQL queries against the patient database

Cross-tab Synchronization: Data updates are synchronized across browser tabs

Persistent Storage: Data persists across page refreshes using IndexedDB

Technologies Used
React (with Vite)

PGlite (PostgreSQL in the browser)

Tailwind CSS for styling

Phosphor Icons for UI icons



Usage
Register Patients:

Navigate to the "Register Patient" tab

Fill out the patient details form

Click "Register Patient" to save

View Patients:

Navigate to the "View Patients" tab

See all registered patients in a sortable table

Execute SQL Queries:

Navigate to the "SQL Query" tab

Enter your SQL query in the text area

Click "Execute Query" to run the query

View results or error messages below

Deployment
This app is configured for easy deployment to Vercel. To deploy your own instance:

Push your code to a GitHub repository

Create a new project in Vercel and import your repository

Use the following build settings:

Framework: Vite

Build Command: npm run build

Output Directory: dist

Click "Deploy"

Commit History
The project was developed with a clear commit history documenting each feature:

Initial project setup with Vite and React

Implement PGlite database connection and initialization

Create patient registration form component

Implement patient list display component

Add SQL query editor component for raw queries

Create tab navigation for the application

Set up main application structure and styling

Add Vercel deployment configuration

Challenges and Solutions
Database Initialization: Implemented a singleton pattern to ensure PGlite initializes only once across tabs

Cross-tab Updates: Used a refresh key mechanism to sync data changes across tabs

Dynamic SQL Results: Created a flexible table component that adapts to any query result structure

Data Persistence: Leveraged IndexedDB through PGlite for persistent browser storage
