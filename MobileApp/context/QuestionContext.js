import { createContext, useContext, useState } from "react";

const QuestionContext = createContext();

export const useQuestion = () => useContext(QuestionContext);

export const QuestionProvider = ({ children }) => {
    const [isQuestionActive, setIsQuestionActive] = useState(false);
    const [questionData, setQuestionData] = useState({
        question: "",
        subQuestionData: "",
    });

    function openQuestionMenu() {
        setIsQuestionActive(true);
    }

    function closeQuestionMenu() {
        setIsQuestionActive(false);
    }

    function formQuestionStructure(data) {
        setQuestionData(data);
    }

    function yesQuestionAnswer(answerHandler) {
        answerHandler();

        setIsQuestionActive(false);
    }

    function noQuestionAnswer() {
        setIsQuestionActive(false);
    }

    return (
        <QuestionContext.Provider value={{ isQuestionActive, questionData, openQuestionMenu, closeQuestionMenu, formQuestionStructure, yesQuestionAnswer, noQuestionAnswer }}>
            {children}
        </QuestionContext.Provider>
    );
}