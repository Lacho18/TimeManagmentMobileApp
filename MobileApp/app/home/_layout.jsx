import { Stack } from "expo-router";
import { ThemeProvider } from "../../context/ThemeContext";
import Navigation from "./navigation";
import { UserProvider } from "../../context/UserContext";
import AddTask from "../../components/NewTaskComponents/AddTask";
import { useState } from "react";
import CreateTask from "../../components/NewTaskComponents/CreateTask";
import "../../utils/dateUtil";
import StressTest from "../../components/StressTest";

export default function RootLayout() {
  //Manage whether the add task menu is visible or not
  const [showAddTask, setShowAddTask] = useState(false);

  //Shows the add task menu
  const showAddTaskMenu = () => setShowAddTask(true);

  //Hides the add task menu
  const closeAddTaskMenu = () => setShowAddTask(false);

  //Manage whether the stress test is active or not
  const [stressTest, setStressTest] = useState(false);

  //Starts stress test
  const startStressTest = () => setStressTest(true);

  //Ends stress test
  const endStressTest = () => setStressTest(false);

  return (
    <UserProvider>
      <ThemeProvider>
        <Stack screenOptions={{ headerShown: false }}></Stack>

        <AddTask showAddTaskMenu={showAddTaskMenu} />
        {showAddTask && (
          <CreateTask
            closeAddTaskMenu={closeAddTaskMenu}
            visible={showAddTask}
          />
        )}
        {stressTest && <StressTest />}
        <Navigation />
      </ThemeProvider>
    </UserProvider>
  );
}
