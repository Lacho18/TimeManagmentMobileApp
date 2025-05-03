export const durationColorSetter = (durationText) => {

    if (typeof durationText !== "string") return "#1ced1c";

    if (durationText.includes("minute") && !durationText.includes("hour")) {
        return "#1ced1c";
    }
    else if (durationText.includes("minute") && durationText.includes("hour")) {
        return "#f0f013";
    }
    else if (durationText.includes("day")) {
        return "#f57607";
    }
    else if (durationText.includes("month")) {
        return "#f00a0a";
    }
    else {
        return "#911c8b";
    }
}