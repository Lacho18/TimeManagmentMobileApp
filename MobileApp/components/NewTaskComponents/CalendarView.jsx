import { View } from "react-native";
import {
  format,
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  startOfMonth,
} from "date-fns";
import MonthView from "./MonthView";

export default function CalendarView({
  monthsAhead,
  theme,
  onDateSelect,
  dateType,
}) {
  const today = new Date();

  const generateMonthData = (startDate, isFirstMonth = false) => {
    const start = isFirstMonth ? today : startOfMonth(startDate);
    const end = endOfMonth(startDate);
    const days = eachDayOfInterval({ start, end });

    return {
      title: format(startDate, "MMMM yyyy"),
      days,
    };
  };

  const months = [];
  for (let i = 0; i <= monthsAhead; i++) {
    const monthDate = addMonths(today, i);
    months.push(generateMonthData(monthDate, i === 0));
  }

  return (
    <View>
      {months.map((month) => (
        <MonthView
          key={month.title}
          month={month}
          theme={theme}
          onDateSelect={onDateSelect}
          dateType={dateType}
        />
      ))}
    </View>
  );
}
