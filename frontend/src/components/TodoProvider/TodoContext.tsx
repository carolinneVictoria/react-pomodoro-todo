import { createContext } from "react";
import type { TodoContextType } from "../../contexts/types";

const TodoContext = createContext<TodoContextType | null>(null);

export default TodoContext;