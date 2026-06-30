import type { Todo } from "../../contexts/types";
import ToDoItem from "../ToDoItem";
import ToDoList from "../ToDoList";
import styles from "./todogroup.module.css";

type TodoGroupProps = {
    todos: Todo[];
};

const TodoGroup = ({ todos }: TodoGroupProps) => {
    if (todos.length === 0) {
        return (
            <p className={styles.emptyState}>
                Nenhuma tarefa por aqui... adicione uma! ✨
            </p>
        );
    }

    return (
        <div className={styles.tarefasContainer}>
            <ToDoList>
                {todos.map(todo => (
                    <ToDoItem
                        key={todo.id}
                        item={todo}
                    />
                ))}
            </ToDoList>
        </div>
    );
};

export default TodoGroup;