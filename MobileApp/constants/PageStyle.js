import { StyleSheet } from "react-native";
import { COLORS } from "./Colors";

export const GLOBAL_STYLES = StyleSheet.create({
    page: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    standardText: {
        fontSize: 17,
    },
    standardTextField: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        boxSizing: "border-box",
        fontSize: 15,
        borderWidth: 2,
        borderColor: "black",
        borderRadius: 18,
        backgroundColor: "white",
    },
    errorText: {
        fontSize: 17,
        color: "#b80202",
        textAlign: "center",
    },
    buttonStyle: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        display: "flex",
        flexDirection: "row",
        gap: 20,
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 2,
    },
    buttonText: {
        fontSize: 20,
    }
}
);
