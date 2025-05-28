import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import TaskViewComponent from "../DailyTasks/TaskViewComponent";
import { MONTHS, WEEK_DAYS_FULL_NAME } from "../../constants/DateConstants";
import { equalDates } from "../../utils/dateUtil";

export default function DayOverviewView({
  index,
  font,
  itemsRef,
  date,
  theme,
  isToday,
  selectedDate,
  selectedTasks,
  dateSelectionHandler,
  taskSelectionHandler,
  onCompletedTask,
}) {
  const styles = StyleSheet.create({
    mainDiv: {
      padding: 7,
      borderTopWidth: 2,
      borderBottomWidth: 2,
      borderColor: theme.highlight,
      zIndex: 50,
      position: "relative",
    },
    headDiv: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    text: {
      fontSize: 20,
      color: theme.text,
      fontFamily: font.regular,
    },
    tasksDiv: {
      paddingVertical: 20,
      height: "auto",
    },
    emptyTasksDiv: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: 100,
    },
    emptyTasksDivText: {
      fontSize: 20,
      color: theme.text,
      fontWeight: "bold",
      fontFamily: font.regular,
    },
  });

  return (
    <View style={styles.mainDiv} ref={(ref) => (itemsRef.current[index] = ref)}>
      <TouchableOpacity
        style={styles.headDiv}
        onPress={async () => {
          await dateSelectionHandler(date, index);
        }}
      >
        <Text style={styles.text}>
          {date.getDate()} {MONTHS[date.getMonth()]}
        </Text>
        <Text style={styles.text}>.</Text>
        {isToday && <Text style={styles.text}>Today .</Text>}
        <Text style={styles.text}>{WEEK_DAYS_FULL_NAME[date.getDay()]}</Text>
      </TouchableOpacity>
      {equalDates(selectedDate, date) && (
        <ScrollView
          vertical
          contentContainerStyle={{
            gap: 15,
            justifyContent: "center",
            alignItems: "center",
          }}
          style={styles.tasksDiv}
        >
          {selectedTasks.length === 0 ? (
            <View style={styles.emptyTasksDiv}>
              <Text style={styles.emptyTasksDivText}>
                No tasks for this date
              </Text>
            </View>
          ) : (
            selectedTasks.map((task) => (
              <TaskViewComponent
                key={task.id}
                font={font}
                theme={theme}
                task={task}
                selectTask={() => {
                  taskSelectionHandler(task);
                }}
                onCompleteTask={onCompletedTask}
              />
            ))
          )}
        </ScrollView>
      )}
    </View>
  );
}
