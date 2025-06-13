import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

export const getUserExpoToken = async () => {
    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token!');
            return "";
        }
        const token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log('Expo Push Token:', token);
        return token;
    } else {
        alert('Must use physical device for Push Notifications');
        return "";
    }
}