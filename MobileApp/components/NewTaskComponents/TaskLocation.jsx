import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import {
  DEFAULT_MAP_LATITUDE,
  DEFAULT_MAP_LONGITUDE,
} from "../../constants/coordinates";

import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export default function TaskLocation({ theme }) {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [permissionStatus, setPermissionStatus] = useState("");
  const [locationText, setLocationText] = useState("");

  useEffect(() => {
    //If the component is mounted ask for permission to use the device GPS
    async function locationPermission() {
      //Gets the status of the permission
      const { status } = await Location.requestForegroundPermissionsAsync();
      setPermissionStatus(status);
    }

    locationPermission();
  }, []);

  //Handles the click of the map
  const handleMapPress = async (event) => {
    //Gets the clicked coordinates
    const coordinate = event.nativeEvent.coordinate;
    setSelectedLocation(coordinate);

    try {
      //By selected coordinates gets data for city name, country and street
      const [address] = await Location.reverseGeocodeAsync(coordinate);
      if (address) {
        const addressText = `City: ${address.city}, Street: ${address.street}`;
        setLocationText(addressText);

        console.log("City:", address.city);
        console.log("Street:", address.street);
        console.log("Full Address:", address);
      }
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  console.log(selectedLocation);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      gap: 20,
    },
    label: {
      position: "absolute",
      top: 0,
      left: 20,
      zIndex: 1,
      backgroundColor: "white",
      padding: 10,
      borderRadius: 10,
      elevation: 3,
    },
    map: {
      width: "90%",
      height: 300,
    },
    locationTextStyle: {
      textAlign: "center",
      fontSize: 18,
      color: theme.text,
    },
  });

  if (permissionStatus !== "granted") {
    return (
      <View>
        <FontAwesome6 name="location-dot" size={24} color="black" />
        <Text>
          In order to be able to set task location please allow the application
          to use GPS data
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tap the map to set location:</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: DEFAULT_MAP_LATITUDE,
          longitude: DEFAULT_MAP_LONGITUDE,
          latitudeDelta: 5,
          longitudeDelta: 5,
        }}
        onPress={handleMapPress}
      >
        {selectedLocation && <Marker coordinate={selectedLocation} />}
      </MapView>
      {locationText !== "" && (
        <Text style={styles.locationTextStyle}>
          Selected location:{" "}
          <Text style={{ fontWeight: "bold" }}>{locationText}</Text>
        </Text>
      )}
    </View>
  );
}
