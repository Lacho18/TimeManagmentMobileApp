import { Stack } from "expo-router";
import Navigation from "./navigation";
import AddTask from "../../components/NewTaskComponents/AddTask";
import { useState } from "react";
import CreateTask from "../../components/NewTaskComponents/CreateTask";
import "../../utils/dateUtil";
//import PanicButton from "../../components/Profile/PanicButton";

//Providers
import { UserProvider } from "../../context/UserContext";
import { StressTestProvider } from "../../context/StressTestContext";
import { ThemeProvider } from "../../context/ThemeContext";

export default function RootLayout() {
  //Manage whether the add task menu is visible or not
  const [showAddTask, setShowAddTask] = useState(false);

  //Shows the add task menu
  const showAddTaskMenu = () => setShowAddTask(true);

  //Hides the add task menu
  const closeAddTaskMenu = () => setShowAddTask(false);

  return (
    <UserProvider>
      <ThemeProvider>
        <StressTestProvider>
          <Stack screenOptions={{ headerShown: false }}></Stack>

          <AddTask showAddTaskMenu={showAddTaskMenu} />
          {showAddTask && (
            <CreateTask
              closeAddTaskMenu={closeAddTaskMenu}
              visible={showAddTask}
            />
          )}

          <Navigation />
        </StressTestProvider>
      </ThemeProvider>
    </UserProvider>
  );
}
