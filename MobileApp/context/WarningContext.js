import { createContext, useContext, useState } from "react";

const WarningContext = createContext();

export const useWarning = () => useContext(WarningContext);

export const WarningProvider = ({ children }) => {
    const [warningMessage, setWarningMessage] = useState("");

    function valWarningMessage(message) {
        setWarningMessage(message);
    }

    function clearWarning() {
        setWarningMessage("")
    }

    return (
        <WarningContext.Provider value={{ warningMessage, valWarningMessage, clearWarning }}>
            {children}
        </WarningContext.Provider>
    );
}