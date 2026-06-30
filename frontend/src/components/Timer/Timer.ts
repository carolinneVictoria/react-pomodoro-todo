import { useCallback, useEffect, useRef, useState } from "react";

import playSound from "../../sounds/play.wav";
import pauseSound from "../../sounds/pause.mp3";

export type PomodoroMode = "pomodoro" | "short" | "long";

export type ModeConfig = {
    label: string;
    minutes: number;
}

export const POMODORO_MODES: Record<PomodoroMode, ModeConfig> = {
    pomodoro: { label: "Pomodoro", minutes: 25 },
    short: { label: "Descanso Curto", minutes: 5 },
    long: { label: "Descanso Longo", minutes: 15 },
}

type UseTimerOptions = {
    initialMode?: PomodoroMode;
    // quando chegar em 00:00 (tocar som, trocar de modo...)
    onFinish?: (mode: PomodoroMode) => void;
};

export function useTimer({ initialMode = "pomodoro", onFinish }: UseTimerOptions = {}) {
    const [mode, setMode] = useState<PomodoroMode>(initialMode);
    const [secondsLeft, setSecondsLeft] = useState(
        POMODORO_MODES[initialMode].minutes * 60
    );
    const [isRunning, setIsRunning] = useState(false);

    const playAudio = useRef(new Audio(playSound));
    const pauseAudio = useRef(new Audio(pauseSound));

    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const totalSeconds = POMODORO_MODES[mode].minutes * 60;

    const clearTimer = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, []);

    // efeito que controla o setInterval enquanto isRunning = true
    useEffect(() => {
        if (!isRunning) {
            clearTimer();
            return;
        }

        intervalRef.current = setInterval(() => {
            setSecondsLeft((prev) => {
                if (prev <= 1) {
                    clearTimer();
                    setIsRunning(false);
                    onFinish?.(mode);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return clearTimer;
    }, [isRunning, mode, onFinish, clearTimer]);

    // Troca de modo (pomodoro / descanso surto / descanso longo)

    const changeMode = useCallback((newMode: PomodoroMode) => {
        setIsRunning(false);
        setMode(newMode);
        setSecondsLeft(POMODORO_MODES[newMode].minutes * 60);
    }, []);

    const start = useCallback(() => {
        setSecondsLeft((current) => {
            if (current > 0) setIsRunning(true);
            return current;
        });
    }, []);

    const pause = useCallback(() => setIsRunning(false), []);

    useEffect(() => {
        playAudio.current.volume = 0.3;
        pauseAudio.current.volume = 0.3;
    }, []);

    const toggle = useCallback(() => {
        setIsRunning((running) => {
            if (running) {
                pauseAudio.current.currentTime = 0;
                pauseAudio.current.play();
            } else {
                playAudio.current.currentTime = 0;
                playAudio.current.play();
            }

            return !running;
        });
    }, []);

    const reset = useCallback(() => {
        setIsRunning(false);
        setSecondsLeft(totalSeconds);
    }, [totalSeconds]);

    const formattedTime = formatTime(secondsLeft);
    const progress = totalSeconds > 0 ? 1 - secondsLeft / totalSeconds : 0;

    return {
        mode,
        modes: POMODORO_MODES,
        isRunning,
        secondsLeft,
        totalSeconds,
        formattedTime,
        progress,
        changeMode,
        start,
        pause,
        toggle,
        reset,
    };
}

export function formatTime(totalSeconds: number): string {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}