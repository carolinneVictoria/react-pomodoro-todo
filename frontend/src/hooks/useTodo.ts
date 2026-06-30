import { useContext } from "react";
import TodoContext from "../components/TodoProvider/TodoContext";

export function useTodo() {
    const context = useContext(TodoContext);

    if (!context) {
        throw new Error("useTodo deve ser usado dentro de TodoProvider");
    }

    return context;
}