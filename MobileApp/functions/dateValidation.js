export const dateValidation = (startDate, endDate) => {
    let atTheMoment = new Date();
    atTheMoment.setMinutes(atTheMoment.getMinutes() - 10); // 10 minutes earlier

    console.log("EBANA FYNKCIQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ");
    console.log(startDate);
    console.log(endDate);

    if (startDate && endDate) {
        if (endDate.getTime() < startDate.getTime()) {
            return "The task cannot end before it begins";
        }
        return "";
    }

    if (startDate) {
        if (startDate < atTheMoment) {
            return "Start time cannot be in the past";
        }
        return "";
    }

    if (endDate) {
        if (endDate < atTheMoment) {
            return "End time cannot be in the past";
        }
        return "";
    }

    return "";
}