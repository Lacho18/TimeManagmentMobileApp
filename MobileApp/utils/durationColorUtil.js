export const durationColorSetter = (durationText) => {

    if (typeof durationText !== "string") return "#1ced1c";      //Green

    if (durationText.includes("minute") && !durationText.includes("hour")) {
        return "#1ced1c";           //Green
    }
    else if (durationText.includes("minute") && durationText.includes("hour")) {
        return "#f0f013";           //Yellow
    }
    else if (durationText.includes("day")) {
        return "#f57607";           //Orange
    }
    else if (durationText.includes("month")) {
        return "#f00a0a";          //Red 
    }
    else {
        return "#911c8b";           //Purple
    }
}