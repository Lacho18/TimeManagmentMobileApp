import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Slider from "@react-native-community/slider";
import { useState } from "react";
import { useStressTest } from "../context/StressTestContext";
import { db } from "../firebaseConfig";
import { arrayUnion, doc, updateDoc } from "firebase/firestore/lite";
import { createLog } from "../database/logsController";
import { formatDateMonthName } from "../utils/dateUtil";

function manageColors(value) {
  if (value >= 0 && value <= 25) {
    return {
      prevColor: "#A8D5BA",
      afterColor: "#84C1E0",
      stressType: "Relaxed",
    };
  } else if (value > 25 && value <= 50) {
    return {
      prevColor: "#84C1E0",
      afterColor: "#F6C26B",
      stressType: "Uneasy",
    };
  } else if (value > 50 && value <= 75) {
    return {
      prevColor: "#F6C26B",
      afterColor: "#E1736D",
      stressType: "Stressed",
    };
  } else {
    return {
      prevColor: "#E1736D",
      afterColor: "#9E4D4D",
      stressType: "Overwhelmed",
    };
  }
}

export default function StressLevelSelector({ theme, font, userId }) {
  const { startStressTest } = useStressTest();
  const [stressLevel, setStressLevel] = useState(0);

  const color = manageColors(stressLevel);

  //Adds the new stress level to the stressLevels array of the user
  function addStressLevel() {
    const userDocRef = doc(db, "Users", userId);

    //Creating log for inserting new stress value
    createLog(
      `Inserted new stress level with value: ${stressLevel} on ${formatDateMonthName(
        new Date(),
        false,
        true
      )}`,
      userId
    );

    updateDoc(userDocRef, {
      stressLevels: arrayUnion({
        value: stressLevel,
        date: new Date(),
      }),
    });
  }

  const styles = StyleSheet.create({
    mainDiv: {
      width: "100%",
      height: 375,
      borderWidth: 3,
      borderColor: theme.accent,
      backgroundColor: theme.primary,
      borderRadius: 18,
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      position: "absolute",
      paddingHorizontal: 10,
    },
    title: {
      fontSize: 21,
      fontFamily: font.bold,
      textAlign: "center",
      color: theme.text,
    },
    hint: {
      fontSize: 15,
      fontFamily: font.regular,
      fontStyle: "italic",
      color: theme.text,
      textAlign: "center",
    },
    buttonStyle: {
      width: 120,
      height: 50,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 2,
      borderColor: theme.highlight,
      borderRadius: 18,
      backgroundColor: theme.background,
      alignSelf: "center",
      marginTop: 10,
    },
    buttonText: {
      fontSize: 18,
      color: theme.text,
      textAlign: "center",
      fontFamily: font.regular,
    },
  });

  return (
    <View style={styles.mainDiv}>
      <View>
        <Text style={styles.title}>Stress level</Text>
        <Text style={styles.hint}>
          Following your stress levels helps in reducing them
        </Text>
      </View>

      <View>
        <Slider
          style={{ width: 300, height: 60 }}
          minimumValue={0}
          maximumValue={100}
          value={stressLevel}
          onValueChange={(value) => setStressLevel(Math.round(value))}
          minimumTrackTintColor={color.prevColor}
          maximumTrackTintColor={color.afterColor}
          thumbTintColor={theme.highlight}
          tapToSeek={true}
        />
        <Text style={[styles.title, { fontSize: 18 }]}>{color.stressType}</Text>
      </View>
      <View>
        <TouchableOpacity style={styles.buttonStyle} onPress={addStressLevel}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 15 }}>
        <Text style={styles.hint}>
          If you are not sure how you fill, you can answer some questions.
        </Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => startStressTest()}
        >
          <Text style={styles.buttonText}>Stress test</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
