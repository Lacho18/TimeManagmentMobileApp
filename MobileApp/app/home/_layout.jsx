import { Stack } from "expo-router";
import Navigation from "./navigation";
import AddTask from "../../components/NewTaskComponents/AddTask";
import { useState } from "react";
import CreateTask from "../../components/NewTaskComponents/CreateTask";
import "../../utils/dateUtil";

//Providers
import { UserProvider } from "../../context/UserContext";
import { StressTestProvider } from "../../context/StressTestContext";
import { ThemeProvider } from "../../context/ThemeContext";
import { QuestionProvider } from "../../context/QuestionContext";
import { FontProvider } from "../../context/FontContext";
import { WarningProvider } from "../../context/WarningContext";

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
          <QuestionProvider>
            <FontProvider>
              <WarningProvider>
                <Stack screenOptions={{ headerShown: false }}></Stack>

                <AddTask showAddTaskMenu={showAddTaskMenu} />
                {showAddTask && (
                  <CreateTask
                    closeAddTaskMenu={closeAddTaskMenu}
                    visible={showAddTask}
                  />
                )}

                <Navigation />
              </WarningProvider>
            </FontProvider>
          </QuestionProvider>
        </StressTestProvider>
      </ThemeProvider>
    </UserProvider>
  );
}
