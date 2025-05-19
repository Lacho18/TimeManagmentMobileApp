import { createContext, useState } from "react";

const QuestionContext = createContext();

const useQuestion = () => useContext(QuestionContext);

export const QuestionProvider = ({ children }) => {
    const [isQuestionActive, setIsQuestionActive] = useState(false);
}