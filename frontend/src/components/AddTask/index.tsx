import type { ReactNode } from "react";

type AddTaskProps = {
    children: ReactNode;
};

const AddTask = ({ children }: AddTaskProps) => {
    return (
        <section className="section">
            {children}
        </section>
    )
}

export default AddTask;