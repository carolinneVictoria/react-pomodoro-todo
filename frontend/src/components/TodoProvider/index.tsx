import { useEffect, useState, type ReactNode } from "react";
import type { Todo } from "../../contexts/types";
import TodoContext from "./TodoContext";


const TODOS = 'todos';

type TodoProps = {
    children: ReactNode;
}

const TodoProvider = ({ children }: TodoProps) => {
    const [todos, setTodos] = useState<Todo[]>(() => {
        const savedTodos = localStorage.getItem(TODOS);

        return savedTodos ? JSON.parse(savedTodos) : [];
    });

    const [showDialog, setShowDialog] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

    useEffect(() => {
        localStorage.setItem(TODOS, JSON.stringify(todos));
    }, [todos]);

    const openFormTodoDialog = (todo?: Todo) => {
        if (todo) {
            setSelectedTodo(todo);
        }
        setShowDialog(true);
    }

    const closeFormTodoDialog = () => {
        setShowDialog(false);
        setSelectedTodo(null);
    }

    const addTodo = (formData: FormData) => {
        const description = formData.get("description")?.toString() ?? "";
        setTodos(prevState => {
            const todo: Todo = {
                id: crypto.randomUUID(),
                description,
                completed: false,
                createdAt: new Date().toISOString()
            }
            return [...prevState, todo]
        })
    };

    const editTodo = (formData: FormData) => {
        const description = formData.get("description")?.toString() ?? "";
        setTodos(prevState =>
            prevState.map(todo =>
                todo.id === selectedTodo?.id ? { ...todo, description } : todo
            )
        );
    };

    const deleteTodo = (id: string) => {
        setTodos(prevState =>
            prevState.filter(todo => todo.id !== id)
        );
    };

    const toggleTodoCompleted = (id: string) => {
        setTodos(prevState =>
            prevState.map(todo =>
                todo.id === id
                    ? { ...todo, completed: !todo.completed }
                    : todo
            )
        );
    };

    return (
        <TodoContext.Provider value={{
            todos,
            addTodo,
            toggleTodoCompleted,
            deleteTodo,
            showDialog,
            openFormTodoDialog,
            closeFormTodoDialog,
            selectedTodo,
            editTodo
        }}
        >
            {children}
        </TodoContext.Provider>
    )
}

export default TodoProvider;