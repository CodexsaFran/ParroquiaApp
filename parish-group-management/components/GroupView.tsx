
import React, { useState } from 'react';
import { Group, User, Role } from '../types';
import { ChevronRightIcon, UsersIcon } from './icons';

interface GroupViewProps {
  groups: Group[];
  users: User[];
  currentUser: User;
}

const GroupItem: React.FC<{
  group: Group;
  level: number;
  onSelectGroup: (groupId: string) => void;
  currentUser: User;
  childGroups: Group[];
}> = ({ group, level, onSelectGroup, currentUser, childGroups }) => {
  const isMember = group.members.includes(currentUser.id);

  return (
    <div>
        <div 
          onClick={() => onSelectGroup(group.id)} 
          className="flex items-center justify-between p-3 my-1 rounded-md cursor-pointer hover:bg-sky-50 transition-colors"
          style={{ paddingLeft: `${1 + level * 1.5}rem` }}
        >
            <div className="flex items-center">
                <span className={`w-2 h-2 rounded-full mr-3 ${isMember ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                <span className="font-medium text-gray-700">{group.name}</span>
            </div>
            <ChevronRightIcon className="w-5 h-5 text-gray-400" />
        </div>
        {childGroups.map(child => (
            <GroupItem key={child.id} group={child} level={level + 1} onSelectGroup={onSelectGroup} currentUser={currentUser} childGroups={[]} />
        ))}
    </div>
  );
};

const GroupDetail: React.FC<{ group: Group; users: User[]; currentUser: User; onBack: () => void; }> = ({ group, users, currentUser, onBack }) => {
    const groupMembers = users.filter(u => group.members.includes(u.id));
    const canManage = currentUser.role === Role.ADMIN_GENERAL || group.admins.includes(currentUser.id);

    return (
        <div className="p-6 bg-white rounded-lg shadow-md h-full flex flex-col">
            <button onClick={onBack} className="text-sky-600 hover:underline mb-4 text-left">&larr; Volver a la lista</button>
            <h3 className="text-2xl font-bold text-gray-800">{group.name}</h3>
            <p className="text-gray-600 mt-2 mb-6">{group.description}</p>
            
            <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-gray-700">Miembros ({groupMembers.length})</h4>
                {canManage && <button className="px-4 py-2 text-sm font-medium text-white bg-sky-600 rounded-md hover:bg-sky-700">Gestionar Miembros</button>}
            </div>
            
            <div className="flex-1 overflow-y-auto pr-2">
                <ul className="space-y-3">
                    {groupMembers.map(member => (
                        <li key={member.id} className="flex items-center p-2 bg-gray-50 rounded-md">
                            <img src={`https://picsum.photos/seed/${member.id}/40/40`} alt={member.name} className="w-10 h-10 rounded-full mr-3" />
                            <div>
                                <p className="font-medium text-gray-800">{member.name}</p>
                                <p className="text-xs text-gray-500">{member.role === Role.USER_STANDARD ? (group.admins.includes(member.id) ? Role.ADMIN_GROUP : member.role) : member.role}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {!group.members.includes(currentUser.id) && (
                <div className="mt-auto pt-4">
                    <button className="w-full px-4 py-3 font-semibold text-white bg-green-600 rounded-md hover:bg-green-700">
                        Solicitar Unirse al Grupo
                    </button>
                </div>
            )}
        </div>
    );
};

export const GroupView: React.FC<GroupViewProps> = ({ groups, users, currentUser }) => {
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);

  const renderGroupTree = (parentId: string | null) => {
    const topLevelGroups = groups.filter(g => g.parentGroupId === parentId);
    return topLevelGroups.map(group => {
        const children = groups.filter(g => g.parentGroupId === group.id);
        return (
            <GroupItem 
                key={group.id} 
                group={group} 
                level={0} 
                onSelectGroup={setSelectedGroupId} 
                currentUser={currentUser}
                childGroups={children}
            />
        )
    });
  };

  const selectedGroup = groups.find(g => g.id === selectedGroupId);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-8 h-full">
      <div className="lg:col-span-1 bg-white p-4 rounded-lg shadow-md h-full flex flex-col">
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">Grupos Parroquiales</h3>
            {currentUser.role === Role.ADMIN_GENERAL && (
                <button className="px-3 py-1 text-sm text-white bg-sky-600 rounded-md hover:bg-sky-700">+</button>
            )}
        </div>
        <div className="flex-1 overflow-y-auto">
            {renderGroupTree(null)}
        </div>
      </div>
      <div className="lg:col-span-2">
        {selectedGroup ? (
          <GroupDetail group={selectedGroup} users={users} currentUser={currentUser} onBack={() => setSelectedGroupId(null)} />
        ) : (
          <div className="flex items-center justify-center bg-white p-6 rounded-lg shadow-md h-full text-center">
            <div>
                <UsersIcon className="mx-auto h-16 w-16 text-gray-300" />
                <h3 className="mt-2 text-lg font-medium text-gray-800">Selecciona un grupo</h3>
                <p className="mt-1 text-sm text-gray-500">
                    Elige un grupo de la lista para ver sus detalles y miembros.
                </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
