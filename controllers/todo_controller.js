//USING IN MEMORY TO STORE THE TODOS
let todos = [];
let idCounter = 1;

//CREATING A TODO
const createTodo = (req,res)=>{
   //DESTRUCTURING  TITLE AND DESCRIPTION FROM THE BODY
    const { title,description } = req.body;
   try {
    //CHECK IF TITLE IS MISSING
    if(!title){
      return res.status(400).json(
     { message:"Title is Required "}
      );
    }
    //CREATE A TODO
    const todo = {
     id:idCounter++,
     title,
     description,
     completed:false,
     createdAt:new Date()
    };

   //PUSH THE TODO
   todos.push(todo);

   //RespondWITH TO TODO CREATED
   return res.status(201).json(todo);

}catch(err){
   return res.status(500).json({ message: "Internal Server Error", error: err.message });

}
}
//GET ALL TODOS
const getTodos = (req,res)=>{
  try {
  res.json(todos)
  } catch (error) {
  res.status(403).json({
    message:"Error While Fetching Todos"
  });
  }
}
//GET A SPECIFIC TODO BY ITS ID
const getTodoById=(req,res)=>{
  const strId =req.params.id;
  const id = parseInt(strId);
  try {
    const todo= todos.find((todo)=>todo.id===id);
     if(!todo){
      return res.status(404).json({
        message:`Todo with ID: ${id} Not found`
      });
     }
     res.json(todo);
  } catch (error) {

  }

}
// UPDTING A SPECIFIC TODO
const updateTodo =(req,res)=>{
  const strId =req.params.id;
  const id = parseInt(strId);
  try {
    const index = todos.findIndex((todo)=>todo.id===id);

    if(index===-1){
      return res.status(404).json({
        message:`Todo with id: ${id} doesnt exist`
      });
    }
    todos[index]={
      ...todos[index],
      ...req.body,
      id:todos[index].id
    }
    res.json(
      todos[index]
);
  } catch (error) {
   res.json({message:"Error Updating the todo"})
  }
}
//DELETING A TODO
const deleteTodo=(req,res)=>{
  const strId = req.params.id;
  const id = parseInt(strId);

  try {
    const index =todos.findIndex((todo)=>todo.id===id);

    if(index===-1){
      res.status(404).json({
        message:"Todo not found"
      });
    }

    todos.splice(index,1);
    res.status(200).send()
  } catch (error) {
  res.status(500).json({message:"Error Deleting the Todo"})
  }
}


module.exports={
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo
}
