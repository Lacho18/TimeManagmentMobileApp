import { useEffect, useRef, useState } from "react";
import { View, Text } from "react-native";
import { MONTHS } from "../../constants/Months";

export default function OverViewHeader() {
  const dateRef = useRef(new Date());
  const [currentMonth, setCurrentMonth] = useState();

  useEffect(() => {
    setCurrentMonth(
      `${MONTHS[dateRef.current.getMonth()]} ${dateRef.current.getFullYear()}`
    );
  }, [dateRef.current]);

  return (
    <View>
      <Text>{currentMonth}</Text>
    </View>
  );
}
