import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [list, setList] = useState([]);
  const [inpValue, setInpValue] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  // ✅ Backend URL
  const API_URL = import.meta.env.VITE_API_URL;

  // ✅ Fetch Todos on page load
  useEffect(() => {
    axios
      .get(`${API_URL}/get`)
      .then((res) => setList(res.data))
      .catch((err) => console.error("Error fetching todos:", err));
  }, []);

  // ✅ Add Task
  function handleAddTask() {
    if (!inpValue.trim()) {
      alert("Please add a task before adding.");
      return;
    }

    axios
      .post(`${API_URL}/save`, { toDo: inpValue.trim() })
      .then((res) => {
        setList([...list, res.data]);
        setInpValue("");
      })
      .catch((err) => console.error("Error adding todo:", err));
  }

  // ✅ Update Task (frontend only or backend if you have update route)
  function handleUpdateTask() {
    if (!inpValue.trim()) {
      alert("Please add a task before updating.");
      return;
    }

    const updatedList = [...list];
    updatedList[editIndex] = {
      ...updatedList[editIndex],
      toDo: inpValue.trim(),
    };
    setList(updatedList);
    setInpValue("");
    setEditIndex(null);
    setIsEdit(false);

    // Optional: If backend has update route
    axios.put(`${API_URL}/update/${updatedList[editIndex]._id}`, {
      toDo: inpValue.trim(),
    });
  }

  // ✅ Delete Task
  function handleDelete(id) {
    if (isEdit) {
      alert("Please complete the editing process before deleting an item.");
      return;
    }

    axios
      .delete(`${API_URL}/delete/${id}`)
      .then(() => {
        setList(list.filter((elem) => elem._id !== id));
      })
      .catch((err) => console.error("Error deleting todo:", err));
  }

  // ✅ Delete All Tasks
  function handleDeleteAll() {
    if (isEdit) {
      alert("Please complete the editing process before deleting all items.");
      return;
    }

    axios
      .delete(`${API_URL}/deleteAll`)
      .then(() => {
        setList([]);
      })
      .catch((err) => console.error("Error deleting all todos:", err));
  }

  // ✅ Edit Handler
  function handleEdit(i) {
    setEditIndex(i);
    setIsEdit(true);
    setInpValue(list[i].toDo);
  }

  // ✅ Cancel Edit
  function handleCancelEdit() {
    setIsEdit(false);
    setEditIndex(null);
    setInpValue("");
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center p-4 sm:p-8">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-xl p-6 md:p-10 mt-10">
        <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-8">
          🚀 Awesome To-Do List
        </h1>

        {/* Input and Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <input
            type="text"
            placeholder={isEdit ? "Edit your task..." : "Add a new task..."}
            value={inpValue}
            onChange={(e) => setInpValue(e.target.value)}
            className="grow p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition duration-300 shadow-sm"
          />

          <div className="flex gap-2 w-full sm:w-auto">
            <button
              className={`shrink-0 px-5 py-3 rounded-lg text-white font-semibold transition duration-300 ease-in-out ${
                isEdit
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-indigo-600 hover:bg-indigo-700"
              } shadow-md hover:shadow-lg`}
              onClick={isEdit ? handleUpdateTask : handleAddTask}
            >
              {isEdit ? "Update Task" : "Add Task"}
            </button>

            {isEdit ? (
              <button
                className="shrink-0 px-5 py-3 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white font-semibold transition duration-300 ease-in-out shadow-md hover:shadow-lg"
                onClick={handleCancelEdit}
              >
                Cancel
              </button>
            ) : (
              <button
                className="shrink-0 px-5 py-3 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold transition duration-300 ease-in-out shadow-md hover:shadow-lg disabled:opacity-50"
                onClick={handleDeleteAll}
                disabled={list.length === 0}
              >
                Delete All
              </button>
            )}
          </div>
        </div>

        {/* Todo List */}
        {list.length === 0 ? (
          <p className="text-center text-gray-500 text-xl mt-12">
            🎉 Your to-do list is empty! Add a task above.
          </p>
        ) : (
          <ul className="space-y-3">
            {list.map((elem, i) => (
              <li
                key={elem._id || elem.id}
                className={`flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm transition duration-300 ${
                  isEdit && editIndex === i
                    ? "border-indigo-500 ring-2 ring-indigo-200"
                    : ""
                }`}
              >
                <span
                  className={`grow text-lg font-medium text-gray-700 wrap-break-word pr-4 ${
                    isEdit && editIndex === i ? "text-indigo-600 font-bold" : ""
                  }`}
                >
                  {elem.toDo}
                </span>

                <div className="flex space-x-2 shrink-0">
                  <button
                    className="px-3 py-1 text-sm rounded-md bg-yellow-500 hover:bg-yellow-600 text-white font-medium transition duration-200 disabled:opacity-50"
                    onClick={() => handleEdit(i)}
                    disabled={isEdit && editIndex !== i}
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py-1 text-sm rounded-md bg-red-500 hover:bg-red-600 text-white font-medium transition duration-200 disabled:opacity-50"
                    onClick={() => handleDelete(elem._id || elem.id)}
                    disabled={isEdit}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
