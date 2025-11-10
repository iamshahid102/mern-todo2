import ToDoModel from "../models/ToDoModel.js";

// Get all todos
export const getToDos = async (req, res) => {
  try {
    const toDos = await ToDoModel.find();
    res.status(200).send(toDos);
  } catch (error) {
    res.status(500).send({ message: "Error fetching todos", error });
  }
};

// Save a new todo
export const saveToDo = async (req, res) => {
  try {
    const { toDo } = req.body;
    const newToDo = await ToDoModel.create({ toDo });
    res.status(201).send(newToDo);
  } catch (error) {
    res.status(500).send({ message: "Error saving todo", error });
  }
};

// Delete a todo
export const deleteToDo = async (req, res) => {
  try {
    const { id } = req.params;
    await ToDoModel.findByIdAndDelete(id);
    res.status(200).send({ message: "ToDo deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error deleting todo", error });
  }
};

// Delete all todos
export const deleteAllToDos = async (req, res) => {
  try {
    await ToDoModel.deleteMany({});
    res.status(200).send({ message: "All ToDos deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error deleting all todos", error });
  }
};

// Update a todo
export const updateToDo = async (req, res) => {
  try {
    const { id } = req.params;
    const { toDo } = req.body;
    const updatedToDo = await ToDoModel.findByIdAndUpdate(
      id,
      { toDo },
      { new: true }
    );
    res.status(200).send(updatedToDo);
  } catch (error) {
    res.status(500).send({ message: "Error updating todo", error });
  }
};
