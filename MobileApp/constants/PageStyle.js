import { StyleSheet } from "react-native";

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
        paddingVertical: 7,
        paddingHorizontal: 10,
        boxSizing: "border-box",
        fontSize: 18,
        borderWidth: 2,
        borderColor: "black",
        borderRadius: 12,
        backgroundColor: "white",
    },
    errorText: {
        fontSize: 18,
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
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 20,
        textAlign: "center",
        width: "100%",
    }
}
);
