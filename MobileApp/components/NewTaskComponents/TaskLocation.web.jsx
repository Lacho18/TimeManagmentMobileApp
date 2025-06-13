export default function TaskLocation({ theme }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.background,
      }}
    >
      <Text style={{ fontSize: 21, color: theme.text }}>
        The function for selecting location is not supported on the browser
      </Text>
    </View>
  );
}
