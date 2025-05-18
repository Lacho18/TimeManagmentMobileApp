/*
    THE PANIC BUTTON
    1. Detects the tasks with low or middle priority
    2. Changes their priority with 1 up
    3. Sets the tasks status to delayed
    4. Move the tasks to the next day starting time from the begin of the day
    5. The delayed tasks are filtered by their start time before the changes
    6. The already existing tasks are moved forward of time
*/

export const panicButtonHandler = () => {

    console.log("Panic button was pressed");
}