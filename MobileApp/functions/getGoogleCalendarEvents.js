import axios from 'axios';

export const getGoogleCalendarEvents = async (token) => {
    console.log("Are laaaa");
    try {
        const response = await axios.get(
            "https://www.googleapis.com/calendar/v3/calendars/primary/events",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    //timeMin: (new Date()).toISOString(), // only future events
                    singleEvents: true,
                    orderBy: "startTime",
                }
            }
        );

        console.log(response);
        return response.data.items;
    }
    catch (error) {
        console.error(error);

        return [];
    }

}