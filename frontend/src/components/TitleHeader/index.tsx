import styles from './titleheader.module.css'

export const TitleHeader = () => {
    return (
        <div className={styles.header}>
            <h1 className={styles.titulo}>🍅 Pomodoro & Tarefas</h1>
            <p>Organize seu tempo e seja mais produtivo</p>
        </div>
    )
}