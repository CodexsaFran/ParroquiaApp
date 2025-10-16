import React, { useState } from 'react';
import { User, Event } from '../types';
import { CalendarIcon, BellIcon, XIcon } from './icons';

interface DashboardProps {
  currentUser: User;
  events: Event[];
}

export const Dashboard: React.FC<DashboardProps> = ({ currentUser, events }) => {
  const [showNotification, setShowNotification] = useState(true);

  const upcomingEvents = events
    .filter(event => 
        (event.groupId === null || currentUser.groups.includes(event.groupId)) && 
        event.startTime > new Date()
    )
    .sort((a, b) => a.startTime.getTime() - b.startTime.getTime())
    .slice(0, 3);
  
  const now = new Date();
  const limit48h = new Date(now.getTime() + 48 * 60 * 60 * 1000);

  const eventsInNext48Hours = events
    .filter(event =>
      (event.groupId === null || currentUser.groups.includes(event.groupId)) &&
      event.startTime > now &&
      event.startTime <= limit48h
    );

  return (
    <div className="p-8">
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-800">Bienvenido, {currentUser.name}!</h2>
        <p className="mt-2 text-gray-600">Aquí tienes un resumen de la actividad reciente en tu parroquia.</p>
      </div>

      {eventsInNext48Hours.length > 0 && showNotification && (
        <div className="mt-6 bg-sky-50 border-l-4 border-sky-400 text-sky-800 p-4 rounded-r-lg shadow-sm" role="alert">
          <div className="flex items-center">
            <BellIcon className="w-6 h-6 mr-4 flex-shrink-0"/>
            <div className="flex-grow">
              <p className="font-bold">Recordatorio de eventos</p>
              <p className="text-sm">
                Tienes {eventsInNext48Hours.length} evento{eventsInNext48Hours.length > 1 ? 's' : ''} en las próximas 48 horas.
              </p>
            </div>
            <button onClick={() => setShowNotification(false)} aria-label="Cerrar notificación" className="ml-4 p-1 rounded-full hover:bg-sky-200 transition-colors">
                <XIcon className="w-5 h-5 text-sky-700"/>
            </button>
          </div>
        </div>
      )}

      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Próximos Eventos</h3>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map(event => (
              <div key={event.id} className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center text-sky-600 mb-2">
                  <CalendarIcon className="w-5 h-5 mr-3" />
                  <h4 className="font-bold text-lg">{event.title}</h4>
                </div>
                <p className="text-gray-600 text-sm mb-3">{event.description}</p>
                <p className="text-gray-500 text-xs font-medium">
                  {event.startTime.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} - {event.startTime.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 col-span-full">No hay eventos próximos.</p>
          )}
        </div>
      </div>
    </div>
  );
};