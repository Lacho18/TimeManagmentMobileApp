import { eachDayOfInterval, endOfDay, endOfWeek, isSameWeek, startOfDay, startOfWeek } from "date-fns";
import { getDateFromStartTime } from "../functions/panicButtonHandler";

//Formats the date as a string
export const formatDate = (date) => {
    //In case of FireStore TimeStamp
    if (date?.toDate) {
        date = date.toDate();
    }

    //Adds 0 in front of 1 digit number
    const twoDigits = (num) => num.toString().padStart(2, '0');

    return `${twoDigits(date.getDate())}.${twoDigits(date.getMonth() + 1)}.${date.getFullYear()} at time ${twoDigits(date.getHours())}:${twoDigits(date.getMinutes())}`;
}

export const formatDateMonthName = (date, withHours = true, withDigits = false) => {
    if (date?.toDate) {
        date = date.toDate();
    }

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const twoDigits = (num) => num.toString().padStart(2, '0');

    if (withHours) {
        return `${twoDigits(date.getDate())} ${months[date.getMonth()]} ${twoDigits(date.getHours())}:${twoDigits(date.getMinutes())}`;
    }
    else if (withDigits) {
        return `${twoDigits(date.getDate())}.${twoDigits(date.getMonth())}`;
    }
    else {
        return `${twoDigits(date.getDate())} ${months[date.getMonth()]}`;
    }

}

export const formatHoursFromDate = (date) => {
    if (date?.toDate) {
        date = date.toDate();
    }

    return `${String(date.getHours()).padStart(2, "0")}:${String(
        date.getMinutes()
    ).padStart(2, "0")}`
}

//Calculates text value from given milliseconds
export const millisecondsCalculator = (milliseconds) => {
    const totalSeconds = parseInt(Math.floor(milliseconds / 1000));
    const minutes = parseInt(Math.floor(totalSeconds / 60));
    const hours = parseInt(Math.floor(minutes / 60));
    const days = parseInt(Math.floor(hours / 24));
    const months = parseInt(Math.floor(days / 30));
    const years = parseInt(Math.floor(months / 12));

    if (years > 0) {
        return `${years} year${years > 1 && "s"}`;
    }
    else if (months > 0) {
        return `${months} month${months > 1 && "s"}`;
    }
    else if (days > 0) {
        return `${days} day${days > 1 ? "s" : ""} ${hours > 0 && "and " + hours + " hours"}`;
    }
    else if (hours > 0) {
        return `${hours} hour${hours > 1 ? "s" : ""} ${minutes > 0 && `and ${minutes - (hours * 60)} minute${minutes > 1 && "s"}`}`;
    }
    else {
        return `${minutes} minute${minutes > 1 ? "s" : ""}`;
    }
}

//Gets array of Weeks
export const getCurrentWeek = (weekDay) => {
    const startDay = startOfWeek(weekDay, { weekStartsOn: 1 });
    const endDay = endOfWeek(weekDay, { weekStartsOn: 1 });

    //If the week is the current one return the days from today to sunday
    if (isSameWeek(weekDay, new Date(), { weekStartsOn: 1 })) {
        const today = new Date();
        const days = eachDayOfInterval({ start: today, end: endDay });
        return days;
        //Else return all the days of the week
    } else {
        const days = eachDayOfInterval({ start: startDay, end: endDay });
        return days;
    }
}

//Returns arrays of days from today to given number of days ahead
export const getGivenNumberOfDays = (numberOfDays) => {
    const currentTime = new Date();
    const startDay = startOfDay(currentTime);
    currentTime.setDate(currentTime.getDate() + numberOfDays);
    const endDay = endOfDay(currentTime);

    const days = eachDayOfInterval({ start: startDay, end: endDay });

    return days;
}

//Compares dates by just their Year, Month and Day and returns true if all 3 are equal
export const equalDates = (date1, date2) => {
    if (!date1 || !date2) return false;
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );
}

//Compare the whole dates to the minutes
export const equalDatesWithHours = (date1, date2) => {
    if (!date1 || !date2) return false;

    if (equalDates(date1, date2)) {
        return (date1.getHours() === date2.getHours() && date1.getMinutes() === date2.getMinutes());
    }
    else {
        return false;
    }
}

//The user rest time is set to be 8 hours before the start time of the day. This function checks if the new inserted tasks goes inside the rest interval
export const taskOnRestTime = (userStartTime, taskStartTime, taskEndTime = null) => {
    const startTime = getDateFromStartTime(userStartTime);

    const startRestTime = new Date(startTime);
    startRestTime.setHours(startRestTime.getHours() - 8);

    taskStartTime = new Date(startTime.getFullYear(), startTime.getMonth(), startTime.getDate(), taskStartTime.getHours(), taskStartTime.getMinutes(), 0);

    if (taskStartTime >= startRestTime && taskStartTime < startTime) {
        return false;
    }

    if (taskEndTime) {
        taskEndTime = new Date(startTime.getFullYear(), startTime.getMonth(), startTime.getDate(), taskEndTime.getHours(), taskEndTime.getMinutes(), 0);
        if (taskEndTime >= startRestTime && taskEndTime <= startTime) {
            return false;
        }
    }

    return true;
}