import { createContext, useState } from "react";

const QuestionContext = createContext();

export const useQuestion = () => useContext(QuestionContext);

export const QuestionProvider = ({ children }) => {
    const [isQuestionActive, setIsQuestionActive] = useState(false);
    const [questionData, setQuestionData] = useState({
        question: "",
        subQuestionData: "",
        onYesAnswer: () => { },
        onNoAnswer: () => { }
    });

    function yesQuestionAnswer(answerHandler) {
        answerHandler();

        setIsQuestionActive(false);
    }

    function noQuestionAnswer() {
        setIsQuestionActive(false);
    }

    return (
        <QuestionContext.Provider value={{ isQuestionActive, questionData, yesQuestionAnswer, noQuestionAnswer }}>
            {children}
        </QuestionContext.Provider>
    );
}