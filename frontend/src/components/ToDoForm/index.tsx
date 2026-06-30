import styles from "./to-do-form.module.css";

type ToDoFormProps = {
    onSubmit: (formData: FormData) => void;
    defaultValue?: string;
};

export function ToDoForm({ onSubmit, defaultValue }: ToDoFormProps) {
    return (
        <form
            className={styles.todo}
            action={(formData) => {
                onSubmit(formData);
            }}
        >
            <input
                type="text"
                name="description"
                placeholder="Digite o item que deseja adicionar"
                defaultValue={defaultValue}
                required
            />

            <button type="submit">
                Salvar Item
            </button>
        </form>
    );
}

export default ToDoForm;