import React, {createContext, useContext} from 'react'
import {from, map, of, switchMap, tap} from 'rxjs';
import dayjs from 'dayjs';
import {useAuth} from './auth';
import calendarHelper from "../helpers/constant_calendar";

export const CalendarContext = createContext({});

/**
 * Calendar provider/context for providing API between screens
 * */
const CalendarProvider = ({children}) => {
    //using another context
    const {signOut, accessToken} = useAuth()

    //prepare headers for Google Calendar request to fetch all events.
    const getHeaders = () => {
        return {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-JavaScript-User-Agent': 'Google APIs Explorer'
            }
        }
    }

    //this method is for creating event. Unfortunately, I haven't implemented this part of app but in the next release
    //I'm going to use it.
    const createEvent = () => {
        try {
            const event = {
                summary: 'Google I/O 2022',
                location: '800 Howard St., San Francisco, CA 94103',
                description: 'A chance to hear more about Google\'s developer products.',
                start: {
                    'dateTime': '2022-08-26T09:00:00-07:00'
                },
                end: {
                    'dateTime': '2022-08-26T17:00:00-07:00'
                },
            };

            let init = {
                ...{
                    body: event,
                    method: 'POST',
                }, ...getHeaders()
            };
            console.log(init);
            return from(fetch(calendarHelper.create_url('David-todo'), init)
            ).pipe(
                switchMap(e => {
                    return e.ok ? from(e.json()) : of(signOut())
                }),
            );
        } catch (err) {
            console.log(err)
            return of(err)
        }
    }

    //for next release
    const updateEvent = async () => {
    }

    //this method is responsible for getting all events from the primary calendar by day.
    // You can notice here I'm using RXJS. I'm proud of it since I had never used it before.
    const getEvents = (date) => {
        return from(fetch(
            `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${date}T00:00:00Z&timeMax=${date}T23:59:00Z`,
            {
                ...{
                    method: 'GET',
                }, ...getHeaders()
            }
        )).pipe(
            switchMap(e => {
                return e.ok ? from(e.json()).pipe(
                    map(res => res.items),
                    map(items => {
                        let obj = {};
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
            })
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

