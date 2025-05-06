import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import TaskViewComponent from "../DailyTasks/TaskViewComponent";
import { MONTHS, WEEK_DAYS_FULL_NAME } from "../../constants/DateConstants";

export default function DayOverviewView({
  index,
  itemsRef,
  date,
  theme,
  isToday,
  selectedDate,
  selectedTasks,
  dateSelectionHandler,
}) {
  //console.log(selectedDate.current);
  const styles = StyleSheet.create({
    mainDiv: {
      padding: 7,
      borderTopWidth: 3,
      borderBottomWidth: 3,
      borderColor: theme.secondary,
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
    },
    tasksDiv: {
      paddingVertical: 20,
      height: "auto",
      maxHeight: 450,
    },
  });

  return (
    <View style={styles.mainDiv} ref={(ref) => (itemsRef.current[index] = ref)}>
      <TouchableOpacity
        style={styles.headDiv}
        onPress={() => {
          dateSelectionHandler(date, index);
        }}
      >
        <Text style={styles.text}>
          {date.getDate()} {MONTHS[date.getMonth()]}
        </Text>
        <Text style={styles.text}>.</Text>
        {isToday && <Text style={styles.text}>Today .</Text>}
        <Text style={styles.text}>{WEEK_DAYS_FULL_NAME[date.getDay()]}</Text>
      </TouchableOpacity>
      {selectedDate === date && (
        <ScrollView
          vertical
          contentContainerStyle={{
            gap: 15,
            justifyContent: "center",
            alignItems: "center",
          }}
          style={styles.tasksDiv}
        >
          {selectedTasks.map((task) => (
            <TaskViewComponent
              key={task.id}
              theme={theme}
              task={task}
              selectTask={() => {}}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
}
