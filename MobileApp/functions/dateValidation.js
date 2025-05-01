export const dateValidation = (startDate, endDate) => {

    //At the moment time
    let atTheMoment = new Date();

    console.log(startDate);
    console.log(endDate);

    if (startDate && endDate) {
        //Checks if the end time is before start time
        if (endDate < startDate) {
            return "The task can not end before it begin";
        }
        else return "";
    }
    else if (startDate) {
        //Removes 10 minutes from the current time. The user is planned to have 10 minutes between selecting start time and creating the task
        atTheMoment.setMinutes(atTheMoment.getMinutes() - 10);

        if (startDate < atTheMoment) {
            return "Start time can not be in the past";
        }
        else return "";
    }
    else if (endDate) {
        if (startDate < atTheMoment) {
            return "End time can not be in the past";
        }
        else return "";
    }
    else {
        return "";
    }

}