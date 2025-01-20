const express = require("express");
const router = express.Router();

const {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo
} = require("../controllers/todo_controller")


router.post('/',createTodo)
.get('/',getTodos)
.get('/:id',getTodoById)
.put('/:id',updateTodo)
.delete('/:id',deleteTodo);

module.exports=router;
