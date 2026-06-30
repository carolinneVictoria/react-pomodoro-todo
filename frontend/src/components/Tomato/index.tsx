import styles from './tomato.module.css'

type TomatoProps = {
    time: string;
    isRunning?: boolean;
};

export const Tomato = ({ time, isRunning = false }: TomatoProps) => {
    return (
        <div className={`${styles.tomatoWrapper} ${isRunning ? styles.running : ''}`}>
            <svg viewBox="0 0 200 200" width="350" height="350" aria-hidden="true">
                <circle cx="100" cy="105" r="70" fill="#ff6b6b" />
                <path
                    d="M 100 35 Q 90 25, 80 30 Q 85 35, 90 38 Q 95 35, 100 35"
                    fill="#4ade80"
                />
                <path
                    d="M 100 35 Q 110 25, 120 30 Q 115 35, 110 38 Q 105 35, 100 35"
                    fill="#22c55e"
                />
                <rect
                    x="97"
                    y="30"
                    width="6"
                    height="15"
                    fill="#16a34a"
                    rx="3"
                />
                <ellipse
                    cx="85"
                    cy="90"
                    rx="15"
                    ry="20"
                    fill="white"
                    opacity="0.3"
                />
            </svg>
            <span className={styles.span}>{time}</span>
        </div>
    );
};
