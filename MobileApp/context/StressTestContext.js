import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { QUESTIONS } from "../constants/Questions";

const STRESS_TEST_MAX_QUESTIONS_NUMBER = 8;

const StressTestContext = createContext();

export const StressTestProvider = ({ children }) => {
    const router = useRouter();
    const [stressTestQuestions, setStressTestQuestions] = useState([]);

    useEffect(() => {
        const randomQuestions = [];
        const dataQuestions = [...QUESTIONS];
        const maxNumberOfQuestions = QUESTIONS.length < STRESS_TEST_MAX_QUESTIONS_NUMBER ? QUESTIONS.length : STRESS_TEST_MAX_QUESTIONS_NUMBER

        for (let i = 0; i < maxNumberOfQuestions; i++) {
            let index = Math.round(Math.random() * (dataQuestions.length - 1));
            randomQuestions.push(dataQuestions[index]);
            dataQuestions.splice(index, 1);
        }

        setStressTestQuestions(randomQuestions);
    }, []);

    const startStressTest = () => router.push("/testStress/stressTest");

    const endStressTest = () => setStressTestQuestions(false);

    return <StressTestContext.Provider value={{ stressTestQuestions, startStressTest, endStressTest }}>{children}</StressTestContext.Provider>
}

export const useStressTest = () => useContext(StressTestContext);