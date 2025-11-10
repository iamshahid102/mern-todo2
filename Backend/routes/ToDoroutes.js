import { Router } from "express";
import {
  getToDos,
  saveToDo,
  deleteToDo,
  updateToDo,
  deleteAllToDos,
} from "../controller/ToDoController.js";

const routes = Router();

routes.get("/get", getToDos);
routes.post("/save", saveToDo);
routes.delete("/delete/:id", deleteToDo);
routes.delete("/deleteAll", deleteAllToDos);
routes.put("/update/:id", updateToDo);

export default routes;
