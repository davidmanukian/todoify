//useful constants for calendar
export default Object.freeze({
    create_url: function (calendarId) {
        return `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`
    },

    GET_URL: 'https://www.googleapis.com/calendar/v3/calendars/primary/events'
})
