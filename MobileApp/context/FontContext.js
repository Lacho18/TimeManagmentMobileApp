import { createContext, useContext, useState } from "react";

const fonts = [{
    regular: "sans-serif",
    bold: "sans-serif",
},
{
    regular: "MontserratAlternates-Regular",
    bold: "MontserratAlternates-Bold",
}];

const FontContext = createContext();

export const useMyFont = () => useContext(FontContext);

export const FontProvider = ({ children }) => {
    const [font, setFont] = useState(fonts[1]);

    function changeFont(newFont) {
        setFont(newFont);
    }

    return (
        <FontContext.Provider value={{ font, changeFont }}>
            {children}
        </FontContext.Provider>
    );
}