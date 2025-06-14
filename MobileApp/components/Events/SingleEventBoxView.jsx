import { useEffect, useReducer, useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { formatDate, millisecondsCalculator } from "../../utils/dateUtil";

//Icons
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const MAX_SHORT_DESCRIPTION_LENGTH = 20;

export default function SingleEventBoxView({ font, event, theme }) {
  const [eventDescription, setEventDescription] = useState("");
  const startTime = useRef(new Date(event.start.dateTime));
  const endTime = useRef(new Date(event.end.dateTime));

  const eventDuration = useRef(
    millisecondsCalculator(endTime.current - startTime.current)
  );

  useEffect(() => {
    if (event.description.length < MAX_SHORT_DESCRIPTION_LENGTH) {
      setEventDescription(event.description);
    } else {
      const subString =
        event.description.substring(0, MAX_SHORT_DESCRIPTION_LENGTH) + " .....";
      setEventDescription(subString);
    }
  }, []);

  function getFullText() {
    setEventDescription(event.description);
  }

  const styles = StyleSheet.create({
    mainDiv: {
      width: "90%",
      borderWidth: 3,
      borderColor: theme.highlight,
      borderRadius: 18,
      display: "flex",
      gap: 10,
      backgroundColor: theme.primary,
      paddingHorizontal: 10,
      paddingVertical: 20,
    },

    title: {
      fontSize: 18,
      color: theme.text,
      fontWeight: "bold",
      fontFamily: font.bold,
    },
    descriptionDiv: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
      flexWrap: "wrap",
      marginBottom: 15,
    },
    descriptionText: {
      fontSize: 15,
      color: theme.text,
      fontFamily: font.regular,
    },
    readMoreButton: {
      alignSelf: "flex-end",
      backgroundColor: "transparent",
      marginLeft: 20,
    },
    readMoreText: {
      fontSize: 14,
      color: theme.text,
      fontStyle: "italic",
      textDecorationLine: "underline",
      fontFamily: font.regular,
    },
    detailsDiv: {
      display: "flex",
      gap: 25,
    },
    singleDetailDiv: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: 15,
    },

    singleDetailText: {
      fontSize: 15,
      color: theme.text,
      fontFamily: font.regular,
    },
  });

  return (
    <View style={styles.mainDiv}>
      <Text style={styles.title}>{event.summary}</Text>
      <View style={styles.descriptionDiv}>
        <Text style={styles.descriptionText}>{eventDescription}</Text>
        {eventDescription.includes("....") && (
          <TouchableOpacity style={styles.readMoreButton} onPress={getFullText}>
            <Text style={styles.readMoreText}>Read more</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.detailsDiv}>
        <View style={styles.singleDetailDiv}>
          <AntDesign name="calendar" size={28} color={theme.highlight} />
          <Text style={styles.singleDetailText}>
            {formatDate(new Date(event.start.dateTime))}
          </Text>
        </View>
        <View style={styles.singleDetailDiv}>
          <FontAwesome5
            name="calendar-times"
            size={28}
            color={theme.highlight}
          />
          <Text style={styles.singleDetailText}>
            {formatDate(new Date(event.end.dateTime))}
          </Text>
        </View>
        <View style={styles.singleDetailDiv}>
          <FontAwesome6
            name="hourglass-end"
            size={28}
            color={theme.highlight}
          />
          <Text style={styles.singleDetailText}>{eventDuration.current}</Text>
        </View>
        <View style={styles.singleDetailDiv}>
          <FontAwesome6 name="location-dot" size={28} color={theme.highlight} />
          <Text style={styles.singleDetailText}>{event.location}</Text>
        </View>
      </View>
    </View>
  );
}
