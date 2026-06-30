import type { ReactNode } from "react";
import styles from "./todolist.module.css"

type ToDoListProps = {
    children: ReactNode;
}

const ToDoList = ({children}: ToDoListProps) => {
    return (
        <ul className={styles.tarefas}>
            {children}
        </ul>
    )
}

export default ToDoList;