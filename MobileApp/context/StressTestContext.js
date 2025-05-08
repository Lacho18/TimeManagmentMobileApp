import { createContext, useContext, useState } from "react";

const StressTestContext = createContext();

export const StressTestProvider = ({ children }) => {
    const [stressTest, setStressTest] = useState(false);

    const startStressTest = () => setStressTest(true);

    const endStressTest = () => setStressTest(false);

    return <StressTestContext.Provider value={{ stressTest, startStressTest, endStressTest }}>{children}</StressTestContext.Provider>
}

export const useStressTest = () => useContext(StressTestContext);