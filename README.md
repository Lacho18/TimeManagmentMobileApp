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

1. **Buffer zone between tasks** - this application does not allow users to have two or more tasks at the same time. There is algorithm which automatically change the inserted task times, so that it does not go on the interval of the existing one and also automatically adds buffer zone between them, which is a value of minutes, which can be managed by the user
2. **Specific colors for high stress tasks** - depending on the stress level of the task, it's component is displayed with different color
3. **Calming videos before stressful tasks** - around 15 minutes before high stress level task a suggestion for watching calm video is seen and can be displayed on the app. (The videos are landscapes without sounds)
4. **Breathing animations** - animations which displays when to breathe in and breathe out which lower the stress levels before stressful task

## Database

The database which this mobile app uses is cloud based Firebase service Firestore. This in non-relational database which has 3 collections. Their structure is:

### Users

| Field                | Preferred type | Description                                               |
| -------------------- | -------------- | --------------------------------------------------------- |
| email                | string         | Stores the email of the user                              |
| password             | string/null    | Stores the password of the user                           |
| name                 | string         | Stores the name of the user                               |
| image                | string         | Stores url to the user image or the default image         |
| preferences          | object         | Object with modifiable values for the behavior of the app |
| google_sync          | boolean        | Shows if the user has created account with google         |
| stress_levels        | array          | Array that stores data for stress levels on the past      |
| current_stress_level | number         | Last inserted stress level value                          |
| expo_push_token      | string         | Text value of the device notifications token              |

### Tasks

| Field         | Preferred type | Description                                                  |
| ------------- | -------------- | ------------------------------------------------------------ |
| userId        | string         | Connection to document from the Users collection             |
| title         | string         | Describes the title of the task                              |
| description   | string         | The task description                                         |
| priority      | number         | The priority of the task (Can be from 1 to 4)                |
| stressLevel   | number         | The task stress level (can be from 1 to 5)                   |
| startTime     | Date/null      | The task start date and time                                 |
| endTime       | Date/null      | The task end date and time                                   |
| duration      | string         | Text value describing what is the task duration (30 minutes) |
| durationColor | string         | Color representation for the task duration                   |
| location      | string         | Text that describes the town and the street of the task      |
| reminder      | null           | If not null that task will sends notifications               |
| delayed       | object         | Describes if task is delayed and how many times              |
| repeating     | object         | Used for repeating tasks. Describes the hours of repeating   |
| completed     | boolean        | Shows if the task is completed or not                        |

### Logs

| Field     | Preferred type | Description                                      |
| --------- | -------------- | ------------------------------------------------ |
| userId    | string         | Connection to document from the Users collection |
| message   | string         | Text value describing the log                    |
| createdAt | Date/null      | Date and time of creation of the log             |

The application also uses Firebase Authentication for authenticating the users. This way they can log in easily from another devices.

## Google Calendar synchronization

This application also shows data for the users events. They can be taken from both Google Calendar and device calendar. If the user account is created with valid Google account, data from the Google Calendar can be taken and visualized on the events section. The application only reads data for the events. They are not part of the logic on the app.

## Functionalities

1. **Color theme** - the application support different color themes, which user can easily change
2. **Stress level selector** - fast method for selecting level of stress from the user in order to follow his levels ahead of time
3. **Stress test** - a test with questions that more accurate can describe the user stress levels
4. **Stress levels graph** - graph showing how the stress levels of the user has change over the time. Uses the stress_levels array field of the users
5. **Panic button** - button that sends all low priority level tasks on the next day beginning hours, simplifying the current day if the user has panics
6. **Account settings** - a way to customize the user experience on the app. He can change the values of buffer zone between tasks, max tasks for the day and the day start hours
7. **Warnings for busy schedule** - the app sends warning if the schedule becomes too busy
8. **Rest hours** - the app does not allow creation of task from 8 hours before the day start time to it in order to the full rest

These are the main functionalities on the mobile app and more is planed to be added.
