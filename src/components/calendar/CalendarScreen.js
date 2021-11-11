import React, { useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'

import 'moment/locale/es';
import moment from 'moment'
import { Navbar } from '../ui/Navbar';
import { messages } from '../../helpers/calendar-messages-es';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { uiOpenModal } from '../../actions/ui';
import { useDispatch, useSelector } from 'react-redux';
import { eventClearActiveEvent, eventSetActive, eventStartLoading } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFav } from '../ui/DeleteEventFav';
import { useEffect } from 'react';


moment.locale('es');
const localizer = momentLocalizer(moment);

// const events = [{
//     title: 'Cumpleaños del tereso',
//     start: moment().toDate(),
//     end: moment().add(2, 'hours').toDate(),
//     bgcolor: '#fafafa',
//     notes: 'comprar peras',
//     user: {
//         _id: 123,
//         name: 'Tereso'
//     }
// }]

export const CalendarScreen = () => {

    const [lastview, setLastview] = useState(localStorage.getItem('lastView') || 'month');
    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector(state => state.calendar);
    const { uid } = useSelector(state => state.auth);

    useEffect(() => {

        dispatch(eventStartLoading());

    }, [dispatch])


    const onDoubleClick = (e) => {
        dispatch(uiOpenModal())
    }

    const onSelectEvent = (e) => {
        dispatch(eventSetActive(e));
    }

    const onViewChange = (e) => {
        setLastview(e);
        localStorage.setItem('lastView', e)
    }

    const eventStyleGetter = (event, start, end, isSelected) => {



        const style = {
            backgroundColor: (uid === event.user._id) ? '#367CF7' : '#465660',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }

        return {
            style
        }
    }

    const onSelectSlot = (e) => {
        dispatch(eventClearActiveEvent());
    }

    return (
        <div className="calendar-screen">
            <Navbar />

            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={messages}
                eventPropGetter={eventStyleGetter}
                onSelectEvent={onSelectEvent}
                onDoubleClickEvent={onDoubleClick}
                onSelectSlot={onSelectSlot}
                selectable={true}
                onView={onViewChange}
                view={lastview}
            // components={{
            //     event: CalendarEvent
            // }}
            />
            <AddNewFab />
            {
                activeEvent && <DeleteEventFav />
            }
            <CalendarModal />

        </div>
    )
}
