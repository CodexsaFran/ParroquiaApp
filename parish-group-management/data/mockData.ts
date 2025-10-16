
import { Role, User, Group, Event, Message } from '../types';

export const users: User[] = [
  { id: 'u1', name: 'Admin General', email: 'admin@parroquia.com', role: Role.ADMIN_GENERAL, groups: ['g1', 'g2', 'g3', 'g4', 'g5'] },
  { id: 'u2', name: 'Juan Pérez', email: 'juan.perez@email.com', role: Role.ADMIN_GROUP, groups: ['g1', 'g3'] },
  { id: 'u3', name: 'María García', email: 'maria.garcia@email.com', role: Role.USER_STANDARD, groups: ['g1', 'g4'] },
  { id: 'u4', name: 'Carlos López', email: 'carlos.lopez@email.com', role: Role.USER_STANDARD, groups: ['g2'] },
  { id: 'u5', name: 'Ana Martínez', email: 'ana.martinez@email.com', role: Role.USER_STANDARD, groups: ['g1', 'g2', 'g5'] },
  { id: 'u6', name: 'Pedro Rodríguez', email: 'pedro.r@email.com', role: Role.ADMIN_GROUP, groups: ['g2'] },
];

export const groups: Group[] = [
  { id: 'g1', name: 'Grupo de Jóvenes', description: 'Actividades y reuniones para los jóvenes de la parroquia.', parentGroupId: null, members: ['u1', 'u2', 'u3', 'u5'], admins: ['u2'], canMembersPost: true },
  { id: 'g2', name: 'Coro Parroquial', description: 'Ensayos y participación en las misas.', parentGroupId: null, members: ['u1', 'u4', 'u5', 'u6'], admins: ['u6'], canMembersPost: false },
  { id: 'g3', name: 'Catequesis de Confirmación', description: 'Preparación para el sacramento de la Confirmación.', parentGroupId: 'g1', members: ['u1', 'u2'], admins: ['u2'], canMembersPost: true },
  { id: 'g4', name: 'Cáritas Parroquial', description: 'Acciones de caridad y ayuda a los necesitados.', parentGroupId: null, members: ['u1', 'u3'], admins: ['u1'], canMembersPost: false },
  { id: 'g5', name: 'Lectores', description: 'Grupo de lectores para las celebraciones.', parentGroupId: null, members: ['u1', 'u5'], admins: ['u1'], canMembersPost: true },
];

export const events: Event[] = [
  { id: 'e1', title: 'Misa Dominical', description: 'Celebración principal de la semana.', startTime: new Date(new Date().setDate(new Date().getDate() + 2)), endTime: new Date(new Date().setDate(new Date().getDate() + 2)), groupId: null, creatorId: 'u1' },
  { id: 'e2', title: 'Reunión de Jóvenes', description: 'Planificación de actividades del mes.', startTime: new Date(new Date().setDate(new Date().getDate() + 5)), endTime: new Date(new Date().setDate(new Date().getDate() + 5)), groupId: 'g1', creatorId: 'u2' },
  { id: 'e3', title: 'Ensayo del Coro', description: 'Preparación para la misa de Navidad.', startTime: new Date(new Date().setDate(new Date().getDate() + 3)), endTime: new Date(new Date().setDate(new Date().getDate() + 3)), groupId: 'g2', creatorId: 'u6' },
  { id: 'e4', title: 'Recogida de Alimentos', description: 'Campaña de recogida de alimentos no perecederos.', startTime: new Date(new Date().setDate(new Date().getDate() + 10)), endTime: new Date(new Date().setDate(new Date().getDate() + 10)), groupId: 'g4', creatorId: 'u1' },
  { id: 'e5', title: 'Catequesis', description: 'Sesión semanal de catequesis.', startTime: new Date(new Date().setDate(new Date().getDate() + 6)), endTime: new Date(new Date().setDate(new Date().getDate() + 6)), groupId: 'g3', creatorId: 'u2' },
];

export const messages: Message[] = [
    { id: 'm1', groupId: 'g1', senderId: 'u2', content: 'Hola a todos! Recuerden la reunión de este viernes.', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), type: 'text' },
    { id: 'm2', groupId: 'g1', senderId: 'u3', content: 'Allí estaré!', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 23), type: 'text' },
    { id: 'm3', groupId: 'g1', senderId: 'u5', content: 'Yo también, gracias por el recordatorio!', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 22), type: 'text' },
    { id: 'm4', groupId: 'g2', senderId: 'u6', content: 'Por favor, no olviden repasar las partituras para el ensayo.', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), type: 'text' },
    { id: 'm5', groupId: 'g2', senderId: 'u6', content: 'El ensayo es a las 19:00 en el salón parroquial.', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), type: 'text' },
];
