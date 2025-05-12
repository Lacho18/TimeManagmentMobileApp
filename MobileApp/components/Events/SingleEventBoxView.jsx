import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const MAX_SHORT_DESCRIPTION_LENGTH = 20;

export default function SingleEventBoxView({ event, theme }) {
  const [eventDescription, setEventDescription] = useState("");

  useEffect(() => {
    if (event.description.length < MAX_SHORT_DESCRIPTION_LENGTH) {
      setEventDescription(event.description);
    } else {
      const subString =
        event.description.substring(0, MAX_SHORT_DESCRIPTION_LENGTH) + " .....";
      setEventDescription(subString);
    }
  }, []);

  const styles = StyleSheet.create({
    mainDiv: {
      width: "90%",
      height: 300,
      borderWidth: 5,
      borderColor: theme.primary,
      borderRadius: 18,
      display: "flex",
      gap: 10,
      backgroundColor: theme.secondary,
      padding: 10,
    },

    title: {
      fontSize: 18,
      color: theme.background,
      fontWeight: "bold",
    },
    descriptionText: {
      fontSize: 15,
      color: theme.background,
    },
  });

  return (
    <View style={styles.mainDiv}>
      <Text style={styles.title}>{event.summary}</Text>
      <View>
        <Text style={styles.descriptionText}>{eventDescription}</Text>
        {eventDescription.includes("....") ? (
          <TouchableOpacity>
            <Text>Read more</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity>
            <Text>Hide</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
