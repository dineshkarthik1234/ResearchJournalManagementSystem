import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function AdminNavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role?.toLowerCase() !== 'admin') {
      navigate('/admin/login');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  if (!user || user.role?.toLowerCase() !== 'admin') return null;

  return (
    <nav className="bg-gray-600 flex justify-between items-center p-4 sticky top-0 z-10 shadow-lg transition-colors duration-300 hover:bg-gray-700">
      <div className="flex items-center">
        <Link to="/admin/dashboard" className="text-white text-xl font-bold uppercase mr-6">Admin Portal</Link>
        <Link to="/admin/dashboard" className="text-white mr-4 hover:text-gray-200 transition-colors">Dashboard</Link>
        <Link to="/admin/users" className="text-white mr-4 hover:text-gray-200 transition-colors">Manage Users</Link>
        <Link to="/admin/journals" className="text-white mr-4 hover:text-gray-200 transition-colors">Manage Journals</Link>
        <Link to="/admin/admins" className="text-white mr-4 hover:text-gray-200 transition-colors">Manage Admins</Link>
      </div>
      <div className="flex items-center">
        <span className="text-white mr-4">Welcome, {user.username}!</span>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default AdminNavBar;