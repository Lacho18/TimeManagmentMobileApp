# EASEPLAN

## A mobile app for managing tasks and events with focus of stress reduction

## Technologies

<span style="
  display: inline-block;
  padding: 8px 16px;
  margin: 4px;
  border: 1px solid black;
  border-radius: 12px;
">
JavaScript,
</span>
<span style="
  display: inline-block;
  padding: 8px 16px;
  margin: 4px;
  border: 1px solid black;
  border-radius: 12px;
">
React Native,
</span>
<span style="
  display: inline-block;
  padding: 8px 16px;
  margin: 4px;
  border: 1px solid black;
  border-radius: 12px;
">
Expo,
</span>
<span style="
  display: inline-block;
  padding: 8px 16px;
  margin: 4px;
  border: 1px solid black;
  border-radius: 12px;
">
Firebase,
</span>

## Main idea

This is a hybrid mobile app which can run on both Android and iOS operational systems. It's main purpose is to help users to manage their time and also helps for stress reduction. These are one of the main functionalities:

1. Create tasks for specific dates with start and end hours, location, priority level and stress level
2. Delay task for the next day start time
3. Complete task (Delete task from database)
4. Activity logs for user following his actions
5. Manage events data from both Google Calendar and device calendar
6. See tasks for specific date forward of time

## Stress reduction

This mobile app is focused on stress reduction. It provides different functionalities to achieve this. They are:

1. Buffer zone between tasks - this application does not allow users to have two or more tasks at the same time. There is algorithm which automatically change the inserted task times, so that it does not go on the interval of the existing one and also automatically adds buffer zone between them, which is a value of minutes, which can be managed by the user
2. Specific colors for high stress tasks - depending on the stress level of the task, it's component is displayed with different color
3. Calming videos before stressful tasks - around 15 minutes before high stress level task a suggestion for watching calm video is seen and can be displayed on the app. (The videos are landscapes without sounds)
4. Breathing animations - animations which displays when to breathe in and breathe out which lower the stress levels before stressful task
