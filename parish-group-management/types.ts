
export enum Role {
  ADMIN_GENERAL = 'Administrador General',
  ADMIN_GROUP = 'Administrador de Grupo',
  USER_STANDARD = 'Usuario Estándar',
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  groups: string[]; // array of group IDs
}

export interface Group {
  id: string;
  name: string;
  description: string;
  parentGroupId: string | null;
  members: string[]; // array of user IDs
  admins: string[]; // array of user IDs with ADMIN_GROUP role for this group
  canMembersPost: boolean;
}

export interface Message {
  id: string;
  groupId: string;
  senderId: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'image' | 'document';
}

export interface Event {
  id:string;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  groupId: string | null; // null for general parish events
  creatorId: string;
}
