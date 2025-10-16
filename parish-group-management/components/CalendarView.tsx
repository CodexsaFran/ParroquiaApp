
import React, { useState } from 'react';
import { Event, User } from '../types';

interface CalendarViewProps {
  events: Event[];
  currentUser: User;
}

export const CalendarView: React.FC<CalendarViewProps> = ({ events, currentUser }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDayEvents, setSelectedDayEvents] = useState<Event[]>([]);

  const userVisibleEvents = events.filter(e => e.groupId === null || currentUser.groups.includes(e.groupId));

  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const startDay = startOfMonth.getDay(); // 0 = Sunday, 1 = Monday, ...
  const daysInMonth = endOfMonth.getDate();

  const days = Array.from({ length: startDay }, (_, i) => null).concat(
    Array.from({ length: daysInMonth }, (_, i) => i + 1)
  );
  
  const handleDayClick = (day: number | null) => {
    if (!day) return;
    const dayEvents = userVisibleEvents.filter(event => {
        const eventDate = event.startTime;
        return eventDate.getFullYear() === currentDate.getFullYear() &&
               eventDate.getMonth() === currentDate.getMonth() &&
               eventDate.getDate() === day;
    });
    setSelectedDayEvents(dayEvents);
  };

  const changeMonth = (offset: number) => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + offset, 1));
    setSelectedDayEvents([]);
  };

  return (
    <div className="p-8 flex flex-col md:flex-row gap-8">
      <div className="flex-grow bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => changeMonth(-1)} className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200">&lt;</button>
          <h2 className="text-xl font-bold text-gray-800">
            {currentDate.toLocaleString('es-ES', { month: 'long', year: 'numeric' })}
          </h2>
          <button onClick={() => changeMonth(1)} className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200">&gt;</button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center font-medium text-gray-500 text-sm">
          {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => <div key={day}>{day}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-1 mt-2">
          {days.map((day, index) => {
            const eventsOnDay = day ? userVisibleEvents.filter(e => new Date(e.startTime).toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString()) : [];
            const isSelected = selectedDayEvents.length > 0 && selectedDayEvents[0]?.startTime.getDate() === day;

            return (
              <div
                key={index}
                onClick={() => handleDayClick(day)}
                className={`h-24 p-2 border border-gray-100 rounded-md flex flex-col ${day ? 'cursor-pointer hover:bg-sky-50' : 'bg-gray-50'} ${isSelected ? 'bg-sky-100 border-sky-300' : ''}`}
              >
                {day && <span className="font-semibold text-gray-700">{day}</span>}
                <div className="flex-1 overflow-y-auto text-left mt-1">
                    {eventsOnDay.map(e => <div key={e.id} className="text-xs bg-sky-200 text-sky-800 rounded px-1 mb-1 truncate">{e.title}</div>)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="md:w-1/3 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          Eventos del día {selectedDayEvents.length > 0 ? selectedDayEvents[0].startTime.toLocaleDateString('es-ES') : ''}
        </h3>
        {selectedDayEvents.length > 0 ? (
          <ul className="space-y-4">
            {selectedDayEvents.map(event => (
              <li key={event.id} className="border-l-4 border-sky-500 pl-4">
                <p className="font-semibold text-gray-800">{event.title}</p>
                <p className="text-sm text-gray-600">{event.description}</p>
                <p className="text-xs text-gray-500 mt-1">{event.startTime.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })} - {event.endTime.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Selecciona un día para ver los eventos.</p>
        )}
      </div>
    </div>
  );
};
