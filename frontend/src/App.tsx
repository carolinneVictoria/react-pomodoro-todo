import { use } from "react";
import Card from "./components/Card"
import { TitleHeader } from "./components/TitleHeader"
import { Footer } from "./components/Footer"
import Dialog from "./components/Dialog";
import ToDoForm from "./components/ToDoForm";
import TodoContext from "./components/TodoProvider/TodoContext";

function App() {
  const context = use(TodoContext);

  if (!context) {
    throw new Error("TodoContext deve ser usado dentro de um TodoProvider");
  }

  const { addTodo, showDialog, openFormTodoDialog, closeFormTodoDialog, selectedTodo, editTodo } = context;

  const handleFormSubmit = (formData: FormData) => {
    if (selectedTodo) {
      editTodo(formData)
    } else {
      addTodo(formData)
    }
    closeFormTodoDialog()
  }

  return (
    <>
      <main className="appContainer">
        <TitleHeader />

        <section className="principal-app">
          <Card>
            <Card.Pomodoro />
          </Card>

          <Card>
            <Card.Add>
              <Dialog isOpen={showDialog} onClose={closeFormTodoDialog}>
                <ToDoForm onSubmit={handleFormSubmit}
                  defaultValue={selectedTodo?.description}
                />
              </Dialog>
              <button
                className="adicionarTarefa"
                type="button"
                onClick={() => openFormTodoDialog()}
              >
                +
              </button>
            </Card.Add>

            <Card.Todo/>
          </Card>
        </section>
      </main>
      <Footer />
    </>
  )

}

export default App

