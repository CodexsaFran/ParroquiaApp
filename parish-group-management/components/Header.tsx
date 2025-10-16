import React, { useState, useRef, useEffect } from 'react';
import { User } from '../types';
import { View } from '../App';
import { MenuIcon, ChevronDownIcon } from './icons';

interface HeaderProps {
  currentUser: User;
  allUsers: User[];
  setCurrentUser: (user: User) => void;
  currentView: View;
  onToggleSidebar: () => void;
}

const viewTitles: Record<View, string> = {
  dashboard: 'Inicio',
  groups: 'Gestión de Grupos',
  calendar: 'Calendario de Eventos',
  chat: 'Mensajería',
};

export const Header: React.FC<HeaderProps> = ({ currentUser, allUsers, setCurrentUser, currentView, onToggleSidebar }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuRef]);

  const handleUserSelect = (user: User) => {
    setCurrentUser(user);
    setIsUserMenuOpen(false);
  }

  return (
    <header className="flex items-center justify-between h-20 px-4 sm:px-6 bg-white border-b flex-shrink-0">
      <div className="flex items-center">
        <button onClick={onToggleSidebar} className="md:hidden mr-4 text-gray-600 hover:text-sky-600">
            <MenuIcon className="w-6 h-6" />
        </button>
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">{viewTitles[currentView]}</h2>
      </div>
      <div className="relative" ref={menuRef}>
        <button onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} className="flex items-center p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <img
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
            src={`https://picsum.photos/seed/${currentUser.id}/100/100`}
            alt={currentUser.name}
          />
          <div className="hidden sm:block text-right ml-4">
            <p className="font-semibold text-gray-700">{currentUser.name}</p>
            <p className="text-sm text-sky-600">{currentUser.role}</p>
          </div>
          <ChevronDownIcon className="w-5 h-5 text-gray-500 ml-2" />
        </button>
        {isUserMenuOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl z-20 border">
            <div className="p-3 border-b">
                <p className="text-sm font-semibold">Cambiar de usuario</p>
                <p className="text-xs text-gray-500">Simula la vista de otros roles</p>
            </div>
            <ul className="py-1 max-h-72 overflow-y-auto">
              {allUsers.map(user => (
                <li key={user.id}>
                  <button 
                    onClick={() => handleUserSelect(user)}
                    className={`w-full text-left px-3 py-2 flex items-center hover:bg-sky-50 ${currentUser.id === user.id ? 'bg-sky-100' : ''}`}
                  >
                     <img
                        className="w-8 h-8 rounded-full object-cover mr-3"
                        src={`https://picsum.photos/seed/${user.id}/80/80`}
                        alt={user.name}
                    />
                    <div>
                        <p className="text-sm font-medium text-gray-800">{user.name}</p>
                        <p className="text-xs text-sky-600">{user.role}</p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};