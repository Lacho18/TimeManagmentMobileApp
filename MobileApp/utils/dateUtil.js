//Formats the date as a string
export const formatDate = (date) =>
    `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} at time ${date.getHours()}:${date.getMinutes()}`;