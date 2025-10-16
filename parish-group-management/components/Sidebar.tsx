import React from 'react';
import { HomeIcon, UsersIcon, CalendarIcon, MessageSquareIcon } from './icons';
import { View } from '../App';

interface SidebarProps {
  currentView: View;
  setView: (view: View) => void;
  isMobileOpen: boolean;
  onClose: () => void;
}

const NavItem: React.FC<{
    icon: React.ReactNode;
    label: string;
    isActive: boolean;
    onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center w-full px-4 py-3 text-sm font-medium transition-colors duration-200 ${
        isActive
          ? 'bg-sky-100 text-sky-700'
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      {icon}
      <span className="ml-4">{label}</span>
    </button>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, isMobileOpen, onClose }) => {
  const handleNavClick = (view: View) => {
    setView(view);
    onClose();
  };
  
  const sidebarContent = (
    <div className="flex flex-col w-64 bg-white border-r h-full">
      <div className="flex items-center justify-center h-20 border-b">
        <h1 className="text-2xl font-bold text-sky-700">ParroquiaApp</h1>
      </div>
      <nav className="flex-1 py-4">
        <NavItem 
          icon={<HomeIcon className="w-5 h-5" />} 
          label="Inicio" 
          isActive={currentView === 'dashboard'} 
          onClick={() => handleNavClick('dashboard')} 
        />
        <NavItem 
          icon={<UsersIcon className="w-5 h-5" />} 
          label="Grupos" 
          isActive={currentView === 'groups'} 
          onClick={() => handleNavClick('groups')} 
        />
        <NavItem 
          icon={<CalendarIcon className="w-5 h-5" />} 
          label="Calendario" 
          isActive={currentView === 'calendar'} 
          onClick={() => handleNavClick('calendar')} 
        />
        <NavItem 
          icon={<MessageSquareIcon className="w-5 h-5" />} 
          label="Mensajes" 
          isActive={currentView === 'chat'} 
          onClick={() => handleNavClick('chat')} 
        />
      </nav>
    </div>
  );

  return (
    <>
      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-30 md:hidden transition-opacity duration-300 ${isMobileOpen ? 'bg-black bg-opacity-50' : 'bg-opacity-0 pointer-events-none'}`} onClick={onClose}></div>
      <aside className={`fixed inset-y-0 left-0 z-40 transform ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden transition-transform duration-300 ease-in-out`}>
        {sidebarContent}
      </aside>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex">
        {sidebarContent}
      </aside>
    </>
  );
};