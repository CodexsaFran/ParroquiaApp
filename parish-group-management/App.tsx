import React, { useState } from 'react';
import { users, groups, events, messages } from './data/mockData';
import { User, Group, Event, Message, Role } from './types';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { GroupView } from './components/GroupView';
import { CalendarView } from './components/CalendarView';
import { ChatView } from './components/ChatView';

export type View = 'dashboard' | 'groups' | 'calendar' | 'chat';

// Simulate a logged-in user. In a real app, this would come from an auth context.
const INITIAL_USER_ID = 'u3'; // Try 'u1' for Admin General, 'u2' for Admin Group, 'u3' for Standard User

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | undefined>(users.find(u => u.id === INITIAL_USER_ID));
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  // In a real app, this state would be managed with useReducer, Context, or a state management library.
  const [appUsers] = useState<User[]>(users);
  const [appGroups] = useState<Group[]>(groups);
  const [appEvents] = useState<Event[]>(events);
  const [appMessages] = useState<Message[]>(messages);

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-xl text-red-500">Error: Usuario no encontrado.</p>
      </div>
    );
  }

  const handleSetCurrentUser = (user: User) => {
    setCurrentUser(user);
    // Reset view to dashboard on user switch for a consistent experience
    setCurrentView('dashboard');
  }

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard currentUser={currentUser} events={appEvents} />;
      case 'groups':
        return <GroupView groups={appGroups} users={appUsers} currentUser={currentUser} />;
      case 'calendar':
        return <CalendarView events={appEvents} currentUser={currentUser} />;
      case 'chat':
        return <ChatView groups={appGroups} users={appUsers} messages={appMessages} currentUser={currentUser} />;
      default:
        return <Dashboard currentUser={currentUser} events={appEvents} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-100 font-sans">
      <Sidebar 
        currentView={currentView} 
        setView={setCurrentView} 
        isMobileOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          currentUser={currentUser} 
          allUsers={appUsers}
          setCurrentUser={handleSetCurrentUser}
          currentView={currentView} 
          onToggleSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;