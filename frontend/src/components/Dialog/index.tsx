import { useEffect, useRef, type ReactNode } from "react";
import styles from "./dialog.module.css";
import { IconClose } from "../Icons";

type DialogProps = {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
};

const Dialog = ({ isOpen, onClose, children }: DialogProps) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const dialog = dialogRef.current;

        if (!dialog) return;

        if (isOpen && !dialog.open) {
            dialog.showModal();
        }

        if (!isOpen && dialog.open) {
            dialog.close();
        }
    }, [isOpen]);

    useEffect(() => {
        const dialog = dialogRef.current;

        if (!dialog) return;

        const handleClose = () => {
            onClose();
        };

        dialog.addEventListener("close", handleClose);

        return () => {
            dialog.removeEventListener("close", handleClose);
        };
    }, [onClose]);

    return (
        <dialog ref={dialogRef} className={styles.dialog}>
            <div className={styles.closeWrapper}>
                <button
                    type="button"
                    autoFocus
                    onClick={onClose}
                    className={styles.btnClose}
                >
                    <IconClose />
                </button>
            </div>

            <div className="body">
                {children}
            </div>
        </dialog>
    );
};

export default Dialog;