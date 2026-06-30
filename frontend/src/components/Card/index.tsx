/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./card.module.css";
import lua from "./../../public/lua.png";
import cafe from "./../../public/xicara-de-cafe.png";
import livro from "./../../public/abra-o-livro.png";
import reiniciar from "./../../public/reiniciar.png";
import play from "./../../public/botao-play.png";
import pause from "./../../public/pause.png";
import pauseSound from "../../sounds/pause.mp3";

import { Tomato } from "../Tomato";
import { useTimer, type PomodoroMode } from "../Timer/Timer";
import AddTask from "../AddTask";
import ToDoGroup from "../ToDoGroup";
import { useTodo } from "../../hooks/useTodo";

// import ToDoForm from "../ToDoForm"; // importe quando existir

type CardProps = {
    children: ReactNode;
};

type CardTodoProps = {
    children?: ReactNode;
}

const Card = ({ children }: CardProps) => {
    return (
        <section className={styles.principalcard}>
            {children}
        </section>
    );
};

const MODE_OPTIONS: { key: PomodoroMode; icon: string; alt: string }[] = [
    { key: "pomodoro", icon: livro, alt: "Pomodoro" },
    { key: "short", icon: cafe, alt: "Descanso Curto" },
    { key: "long", icon: lua, alt: "Descanso Longo" },
];

export const CardPomodoro = () => {
    const pauseAudio = useRef(new Audio(pauseSound));

    useEffect(() => {
        pauseAudio.current.volume = 0.3;
    }, []);

    const timer = useTimer({
        onFinish: () => {
            pauseAudio.current.currentTime = 0;
            pauseAudio.current.play();
        },
    });

    return (
        <>
            <div className={styles.buttonGroup}>
                {MODE_OPTIONS.map(({ key, icon, alt }) => (
                    <div
                        key={key}
                        className={`${styles.btnoption} ${timer.mode === key ? styles.ativo : ""
                            }`}
                    >
                        <img src={icon} alt={alt} />
                        <button onClick={() => timer.changeMode(key)}>
                            {timer.modes[key].label}
                        </button>
                    </div>
                ))}
            </div>

            <div className={styles.tomatoContainer}>
                <Tomato time={timer.formattedTime} isRunning={timer.isRunning} />
            </div>

            <div className={styles.buttonGroup}>
                <div className={styles.btniniciar}>
                    <img
                        src={timer.isRunning ? pause : play}
                        alt={timer.isRunning ? "Pausar" : "Iniciar"}
                    />
                    <button onClick={timer.toggle}>
                        {timer.isRunning ? "Pausar" : "Iniciar"}
                    </button>
                </div>

                <div className={styles.btnreiniciar}>
                    <button onClick={timer.reset}>
                        <img src={reiniciar} alt="Reiniciar" />
                    </button>
                </div>
            </div>
        </>
    );
};

export const CardAddTask = ({ children }: CardTodoProps) => {
    return (
        <>
            <div className={styles.text}>
                <h2>📝 Minhas Tarefas</h2>
                <AddTask>
                    {children}
                </AddTask>
            </div>
        </>
    );
};

export const CardTodo = () => {
    const { todos } = useTodo();

    const [filter, setFilter] = useState<"pending" | "completed">("pending");

    const pendingTodos = todos.filter((todo: { completed: any; }) => !todo.completed);
    const completedTodos = todos.filter((todo: { completed: any; }) => todo.completed);

    const visibleTodos =
        filter === "pending" ? pendingTodos : completedTodos;

    const totalTodos = todos.length;
    const completedCount = completedTodos.length;

    const progress =
        totalTodos === 0 ? 0 : (completedCount / totalTodos) * 100;

    return (
        <>
            <div className={styles.todoActions}>
                <button
                    onClick={() => setFilter("pending")}
                    className={filter === "pending" ? styles.active : ""}
                >
                    A fazer ({pendingTodos.length})
                </button>

                <button
                    onClick={() => setFilter("completed")}
                    className={filter === "completed" ? styles.active : ""}
                >
                    Concluídas ({completedTodos.length})
                </button>
            </div>

            <div className={styles.tarefaContainer}>
                <ToDoGroup todos={visibleTodos} />
            </div>

            <hr className={styles.divisor} />

            <div className={styles.progressoContainer}>
                <h4>
                    {completedCount} de {totalTodos} concluídas!
                </h4>

                <div className={styles.progressoInfo}>
                    <div className={styles.barra}>
                        <div
                            className={styles.preenchimento}
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    <span>{Math.round(progress)}%</span>
                </div>
            </div>
        </>
    );
};

Card.Pomodoro = CardPomodoro;
Card.Todo = CardTodo;
Card.Add = CardAddTask;

export default Card;
