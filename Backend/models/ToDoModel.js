import mongoose from "mongoose";

const ToDoSchema = new mongoose.Schema({
  toDo: {
    type: String,
    required: true,
  },
});

const ToDoModel = mongoose.model("ToDo", ToDoSchema);

export default ToDoModel;
