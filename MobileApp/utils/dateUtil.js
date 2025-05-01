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

export const formatDateMonthName = (date) => {
    if (date?.toDate) {
        date = date.toDate();
    }

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const twoDigits = (num) => num.toString().padStart(2, '0');

    return `${twoDigits(date.getDate())} ${months[date.getMonth()]} ${twoDigits(date.getHours())}:${twoDigits(date.getMinutes())}`;
}