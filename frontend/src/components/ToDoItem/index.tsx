import { use } from "react";
import TodoContext from "../TodoProvider/TodoContext";
import type { Todo } from "../../contexts/types";
import { IconPencil } from "../Icons";
import styles from "./todoitem.module.css"
import { IconTrash } from '../Icons/index';

type ToDoItemProps = {
    item: Todo;
}

const ToDoItem = ({ item }: ToDoItemProps) => {
    const context = use(TodoContext);

    if (!context) {
        throw new Error("ToDoItem deve ser usado dentro de TodoProvider");
    }

    const {
        toggleTodoCompleted,
        deleteTodo,
        openFormTodoDialog,
    } = context;

    const classNames = [styles.todoItem];

    if (item.completed) {
        classNames.push(styles.completed);
    }

    return (
        <li className={classNames.join(" ")}>
            <p className={styles.date}>
                {new Date(item.createdAt).toLocaleDateString("pt-BR")}
            </p>

            <div className={styles.details}>
                <input
                    checked={item.completed}
                    onChange={() => toggleTodoCompleted(item.id)}
                    type="checkbox"
                    className={styles.checkbox}
                />

                <p className={styles.description}>
                    {item.description}
                </p>

                <div className={styles.actions}>
                    <button
                        className={styles.btn}
                        onClick={() => openFormTodoDialog(item)}
                    >
                        <IconPencil />
                    </button>
                    <button
                        className={styles.btn}
                        onClick={() => deleteTodo(item.id)}
                    >
                        <IconTrash />
                    </button>
                </div>
            </div>
        </li>
    )
}

export default ToDoItem;