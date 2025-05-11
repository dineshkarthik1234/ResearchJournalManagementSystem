import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BookOpen, LogOut, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../ui/Button';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <BookOpen className="h-8 w-8 text-blue-900" />
              <span className="ml-2 text-xl font-serif font-bold text-blue-900">Academic Journal</span>
            </Link>
          </div>
          
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  className={`px-3 py-2 text-sm font-medium ${
                    location.pathname === '/dashboard' 
                      ? 'text-blue-900 border-b-2 border-blue-900' 
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/publications" 
                  className={`px-3 py-2 text-sm font-medium ${
                    location.pathname === '/publications' 
                      ? 'text-blue-900 border-b-2 border-blue-900' 
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  Publications
                </Link>
                <div className="ml-4 flex items-center">
                  <img 
                    className="h-8 w-8 rounded-full object-cover"
                    src={currentUser?.avatar || 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg'}
                    alt={currentUser?.name || 'User'}
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700">
                    {currentUser?.name}
                  </span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    icon={<LogOut className="h-4 w-4" />}
                    onClick={logout}
                    className="ml-4"
                  >
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Link 
                  to="/publications" 
                  className={`px-3 py-2 text-sm font-medium ${
                    location.pathname === '/publications' 
                      ? 'text-blue-900 border-b-2 border-blue-900' 
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  Publications
                </Link>
                <Link to="/login">
                  <Button variant="secondary" size="sm">
                    Login
                  </Button>
                </Link>
              </>
            )}
          </div>
          
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className={`block px-3 py-2 text-base font-medium ${
                    location.pathname === '/dashboard' 
                      ? 'text-blue-900 bg-blue-50' 
                      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/publications"
                  className={`block px-3 py-2 text-base font-medium ${
                    location.pathname === '/publications' 
                      ? 'text-blue-900 bg-blue-50' 
                      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Publications
                </Link>
                <div className="mt-3 px-3 pt-3 border-t border-gray-200">
                  <div className="flex items-center">
                    <img 
                      className="h-8 w-8 rounded-full object-cover"
                      src={currentUser?.avatar || 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg'} 
                      alt={currentUser?.name || 'User'}
                    />
                    <span className="ml-3 text-base font-medium text-gray-800">
                      {currentUser?.name}
                    </span>
                  </div>
                  <button 
                    className="mt-3 flex items-center text-base font-medium text-gray-500 hover:text-gray-900"
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/publications"
                  className={`block px-3 py-2 text-base font-medium ${
                    location.pathname === '/publications' 
                      ? 'text-blue-900 bg-blue-50' 
                      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Publications
                </Link>
                <Link
                  to="/login"
                  className="block px-3 py-2 text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;