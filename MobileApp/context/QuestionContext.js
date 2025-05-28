import { createContext, useContext, useState } from "react";

const QuestionContext = createContext();

export const useQuestion = () => useContext(QuestionContext);

export const QuestionProvider = ({ children }) => {
    const [isQuestionActive, setIsQuestionActive] = useState(false);
    const [questionData, setQuestionData] = useState({
        question: "",
        subQuestionData: "",
        id: "",
    });

    function openQuestionMenu() {
        setIsQuestionActive(true);
    }

    function closeQuestionMenu() {
        console.log("Aide molq ti sa");
        setIsQuestionActive(false);
    }

    function formQuestionStructure(data) {
        setQuestionData(data);
    }

    function yesQuestionAnswer(answerHandler) {
        answerHandler();

        setIsQuestionActive(false);
    }

    return (
        <QuestionContext.Provider value={{ isQuestionActive, questionData, openQuestionMenu, closeQuestionMenu, formQuestionStructure, yesQuestionAnswer }}>
            {children}
        </QuestionContext.Provider>
    );
}