import { Stack } from "expo-router";
import { ThemeProvider } from "../../context/ThemeContext";
import Navigation from "./navigation";
import { UserProvider } from "../../context/UserContext";
import AddTask from "../../components/AddTask";
import { useState } from "react";
import CreateTask from "../../components/CreateTask";

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
        <Stack screenOptions={{ headerShown: false }}></Stack>

        <AddTask showAddTaskMenu={showAddTaskMenu} />
        {showAddTask && <CreateTask closeAddTaskMenu={closeAddTaskMenu} />}
        <Navigation />
      </ThemeProvider>
    </UserProvider>
  );
}
