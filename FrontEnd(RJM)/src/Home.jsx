import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-6">
        Welcome to the Research Journal Management System
      </h1>

      <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Get Started</h2>
        <p className="mb-4">
          This system streamlines the research paper submission and review process. Choose your role to begin:
        </p>
        <ul className="list-disc pl-6 mb-6 text-gray-700">
          <li>
            <strong>Author:</strong> Submit and manage your research papers.
          </li>
          <li>
            <strong>Editor:</strong> Oversee submissions and assign reviewers.
          </li>
          <li>
            <strong>Reviewer:</strong> Provide feedback on assigned papers.
          </li>
          <li>
            <strong>Admin:</strong> Manage users and system settings.
          </li>
        </ul>

        <div className="flex justify-center space-x-4">
          <Link
            to="/register"
            className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition-colors"
          >
            Sign Up
          </Link>
          <Link
            to="/admin/login"
            className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 transition-colors"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
