
import React, { useState, useRef, useEffect } from 'react';
import { Group, User, Message, Role } from '../types';
import { SendIcon } from './icons';

interface ChatViewProps {
  groups: Group[];
  users: User[];
  messages: Message[];
  currentUser: User;
}

export const ChatView: React.FC<ChatViewProps> = ({ groups, users, messages, currentUser }) => {
  const userGroups = groups.filter(g => g.members.includes(currentUser.id));
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(userGroups[0]?.id || null);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const selectedGroup = groups.find(g => g.id === selectedGroupId);
  const chatMessages = messages.filter(m => m.groupId === selectedGroupId).sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  
  const canPost = selectedGroup && (currentUser.role !== Role.USER_STANDARD || selectedGroup.canMembersPost || selectedGroup.admins.includes(currentUser.id));

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === '' || !canPost) return;
    // Here you would typically send the message to a backend
    console.log(`Sending message to group ${selectedGroupId}: ${newMessage}`);
    setNewMessage('');
  };

  return (
    <div className="flex h-full p-8 gap-8">
      <div className="w-1/3 bg-white p-4 rounded-lg shadow-md flex flex-col">
        <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-3">Mis Grupos</h3>
        <ul className="overflow-y-auto flex-1">
          {userGroups.map(group => (
            <li key={group.id}>
              <button 
                onClick={() => setSelectedGroupId(group.id)}
                className={`w-full text-left p-3 rounded-md flex items-center ${selectedGroupId === group.id ? 'bg-sky-100' : 'hover:bg-gray-50'}`}
              >
                <img src={`https://picsum.photos/seed/${group.id}/40/40`} alt={group.name} className="w-10 h-10 rounded-full mr-3" />
                <div>
                    <p className="font-semibold text-gray-800">{group.name}</p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-2/3 bg-white rounded-lg shadow-md flex flex-col">
        {selectedGroup ? (
          <>
            <div className="p-4 border-b flex items-center">
                <img src={`https://picsum.photos/seed/${selectedGroup.id}/48/48`} alt={selectedGroup.name} className="w-12 h-12 rounded-full mr-4" />
                <div>
                    <h3 className="text-lg font-bold text-gray-800">{selectedGroup.name}</h3>
                    <p className="text-sm text-gray-500">{users.filter(u=>selectedGroup.members.includes(u.id)).map(u=>u.name.split(' ')[0]).join(', ')}</p>
                </div>
            </div>
            <div className="flex-1 p-6 overflow-y-auto bg-slate-50">
                {chatMessages.map(msg => {
                    const sender = users.find(u => u.id === msg.senderId);
                    const isCurrentUser = msg.senderId === currentUser.id;
                    return (
                        <div key={msg.id} className={`flex items-end gap-3 my-2 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                            {!isCurrentUser && <img src={`https://picsum.photos/seed/${sender?.id}/32/32`} className="w-8 h-8 rounded-full" alt={sender?.name}/>}
                            <div className={`max-w-xs md:max-w-md p-3 rounded-2xl ${isCurrentUser ? 'bg-sky-600 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}>
                                {!isCurrentUser && <p className="text-xs font-bold text-sky-700 mb-1">{sender?.name}</p>}
                                <p>{msg.content}</p>
                                <p className={`text-xs mt-1 ${isCurrentUser ? 'text-sky-200' : 'text-gray-500'} text-right`}>{msg.timestamp.toLocaleTimeString('es-ES', {hour: '2-digit', minute:'2-digit'})}</p>
                            </div>
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t">
              {canPost ? (
                <div className="relative">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Escribe un mensaje..."
                    className="w-full pl-4 pr-12 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                  <button onClick={handleSendMessage} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full text-white bg-sky-600 hover:bg-sky-700">
                    <SendIcon className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <div className="text-center text-sm text-gray-500 p-2 bg-gray-100 rounded-full">
                  Solo los administradores pueden enviar mensajes en este grupo.
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-center text-gray-500">
            <p>Selecciona un grupo para comenzar a chatear.</p>
          </div>
        )}
      </div>
    </div>
  );
};
