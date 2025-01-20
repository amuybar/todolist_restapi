const { Todo } = require('../models');

// CREATE A TODO
const createTodo = async (req, res) => {
  const { title, description } = req.body;
  try {
    if (!title) {
      return res.status(400).json({ message: 'Title is Required' });
    }

    const todo = await Todo.create({
       title,
       description,
       completed:false });

    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
};

// GET ALL TODOS
const getTodos = async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: 'Error Fetching Todos', error: err.message });
  }
};

// GET A SPECIFIC TODO BY ID
const getTodoById = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findByPk(id);
    if (!todo) {
      return res.status(404).json({ message: `Todo with ID: ${id} Not Found` });
    }
    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: 'Error Fetching Todo', error: err.message });
  }
};

// UPDATE A TODO
const updateTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findByPk(id);
    if (!todo) {
      return res.status(404).json({ message: `Todo with ID: ${id} Not Found` });
    }
    await todo.update(req.body);
    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: 'Error Updating Todo', error: err.message });
  }
};

// DELETE A TODO
const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findByPk(id);
    if (!todo) {
      return res.status(404).json({ message: `Todo with ID: ${id} Not Found` });
    }
    await todo.destroy();
    res.status(200).send();
  } catch (err) {
    res.status(500).json({ message: 'Error Deleting Todo', error: err.message });
  }
};

module.exports = {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
};
