import React from 'react';
import './App.css';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Welcome to SchoolDocs</h1>
      </header>
      <main>
        <h2>Developer Assessment</h2>
        <p>Thank you for your interest in joining our team at SchoolDocs!</p>
        <p>
          This assessment is designed to evaluate your skills in software
          development.
        </p>
        <div className='instructions'>
          <h3>Instructions:</h3>
          <ol>
            <li>
              You will receive specific tasks based on the role you're applying
              for. These tasks may involve frontend, backend, or full-stack
              development.
            </li>
            <li>
              Focus on creating a clean, maintainable, and well-structured
              codebase.
            </li>
            <li>
              Ensure proper error handling and user feedback in your
              implementation.
            </li>
            <li>
              You can choose to write your own styles or use any UI framework to showcase your design skills.
            </li>
            <li>
              You are also welcome to use TypeScript to demonstrate your proficiency in type safety and code maintainability.
            </li>
            <li>
              Be prepared to discuss your implementation choices and potential
              improvements.
            </li>
          </ol>
        </div>
        <p>Good luck, and we look forward to reviewing your work!</p>
      </main>
    </div>
  );
}

export default App;
