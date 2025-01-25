import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useState } from "react";

const initialTodoState = {
  title: "",
  status: "pending",
};

function App() {
  const [allTodos, setAllTodos] = useState(
    localStorage.getItem("allTodos")?.length > 0
      ? JSON.parse(localStorage.getItem("allTodos"))
      : []
  );
  const [newTodo, setNewTodo] = useState({
    title: "",
    status: "pending",
  });

  const handleAddTodo = () => {
    const tempTodos = allTodos;
    tempTodos.push(newTodo);
    setAllTodos(tempTodos);
    setNewTodo(initialTodoState);
    localStorage.setItem("allTodos", JSON.stringify(allTodos));
  };

  const handleTodoDelete = (_i) => {
    let tempTodos = allTodos;
    let filteredTempTodos = tempTodos.filter((_item, j) => j !== _i);
    setAllTodos(filteredTempTodos);
    localStorage.setItem("allTodos", JSON.stringify(filteredTempTodos));
  };

  const handleTodoStatus = (_i) => {
    let tempTodos = allTodos;
    let selectedTodoStatus = tempTodos[_i]?.status;
    let mappedTempTodos = tempTodos?.map((_item, _k) => {
      if (_k === _i) {
        return {
          title: _item?.title,
          status: selectedTodoStatus === "pending" ? "completed" : "pending",
        };
      } else {
        return _item;
      }
    });
    setAllTodos(mappedTempTodos);
  };

  return (
    <div className="w-50 m-auto">
      <header className="center mt-6">Todos App</header>
      <div>
        <input
          type="text"
          placeholder="Enter todo"
          value={newTodo?.title}
          onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
        />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>

      <hr />
      <h1 className="mt-6">All Todos</h1>
      <div>
        {allTodos?.length > 0 &&
          allTodos?.map((_todo, i) => (
            <div key={i}>
              <span className="mx-5">{_todo?.title}</span>
              <span className="mx-5">{_todo?.status}</span>
              <button
                className="mx-5 text-danger"
                onClick={() => handleTodoStatus(i)}
              >
                Toggle Todo status
              </button>
              <button
                className="mx-5 text-danger"
                onClick={() => handleTodoDelete(i)}
              >
                Delete this Todo
              </button>
            </div>
          ))}
          {allTodos?.length === 0 && (<h4 className="text-center mt-6">No todos found</h4>)}
      </div>

    </div>
  );
}

export default App;
