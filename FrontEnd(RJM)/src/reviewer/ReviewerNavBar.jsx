import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function NavBar({ role }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!role) {
    navigate('/login');
    return null;
  }

  const roleLinks = {
    Admin: [
      { to: '/admin/users', label: 'Manage Users' },
      { to: '/admin/journals', label: 'Manage Journals' },
    ],
    Author: [
      { to: '/author/submit', label: 'Submit Paper' },
      { to: '/author/submissions', label: 'View Submissions' },
      { to: '/author/profile', label: 'Profile' },
    ],
    Editor: [
      { to: '/editor/review-queue', label: 'Review Queue' },
    ],
    Reviewer: [
      { to: '/reviewer/dashboard', label: 'Assigned Papers' },
    ],
  };

  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md" aria-label={`${role} navigation`}>
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <Link
            to={`/${role.toLowerCase()}/dashboard`}
            className="hover:underline hover:text-blue-300 transition-colors"
          >
            {role} Dashboard
          </Link>

          {roleLinks[role]?.map((link, index) => (
            <Link
              key={index}
              to={link.to}
              className="hover:underline hover:text-blue-300 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {user && (
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-colors mt-2 sm:mt-0"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
