import axios from 'axios';

export const getGoogleCalendarEvents = async (token) => {
    try {
        const response = await axios.get(
            "https://www.googleapis.com/calendar/v3/calendars/primary/events",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    singleEvents: true,
                    orderBy: "startTime",
                }
            }
        );

        return response.data.items;
    }
    catch (error) {
        console.error(error);
        return [];
    }

}