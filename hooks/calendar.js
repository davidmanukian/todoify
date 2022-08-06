import React, {createContext, useContext} from 'react'
import {from, map, of, switchMap, tap} from 'rxjs';
import dayjs from 'dayjs';
import {useAuth} from './auth';

export const CalendarContext = createContext({});


const CalendarProvider = ({children}) => {
    const {signOut, accessToken} = useAuth()

    const getHeaders = () => {
        return {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        }
    }

    const createEvent = async () => {
        try {
        } catch (err) {
            console.log(err)
        }
    }

    const updateEvent = async () => {
    }

    const getEvents = () => {
        return from(fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events`, getHeaders())).pipe(
            switchMap(e => {
                return e.ok ? from(e.json()).pipe(
                    map(res => res.items),
                    map(items => {
                        let obj = {};
                        console.log('items', items);
                        items.forEach(item => {
                            let startDate = item?.start?.dateTime;
                            let key = dayjs(startDate).format('YYYY-MM-DD');
                            let endDate = item?.end?.dateTime;
                            const newVar = [{
                                start: startDate,
                                end: endDate,
                                name: item.summary,
                                obj: item
                            }];
                            obj[key] = newVar;
                        })
                        return obj;
                    })
                ) : of(signOut())
            }),
            tap(e => {
                console.log(e)
            }),
        )
    }


    return (
        <CalendarContext.Provider
            value={{
                accessToken,
                createEvent,
                updateEvent,
                getEvents
            }}
        >
            {children}
        </CalendarContext.Provider>
    );
}

const useCalendar = () => {
    return useContext(CalendarContext);
}

export {
    CalendarProvider,
    useCalendar
}

