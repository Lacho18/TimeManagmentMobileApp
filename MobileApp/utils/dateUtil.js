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

export const millisecondsCalculator = (milliseconds) => {
    const result = "";

    const totalSeconds = parseInt(Math.floor(milliseconds / 1000));
    const minutes = parseInt(Math.floor(totalSeconds / 60));
    const hours = parseInt(Math.floor(minutes / 60));
    const days = parseInt(Math.floor(hours / 24));
    const months = parseInt(Math.floor(days / 30));
    const years = parseInt(Math.floor(months / 12));


    //Dovurshi go prosto tova izchislqva milisecuindi v niz

    result = `${minutes}`;
}