const express = require("express");
const cors = require("cors");
const todo_route = require("./routes/todo_route");
const PORT =3004;

//INITIALIZING OUR APP INSTANCE FROM EXPRESS
 const app = express();

//USING CORS --FOR CROSS ORIGIN--
 app.use(cors());
// USING JSON FROM EXPRESS --FOR OUR RESPONSES--
 app.use(express.json());


 //ROUTE

 app.use('/api/todos',todo_route);

 //ERROR HANDLING MIDDLEWARE
 app.listen(PORT,()=>{
  console.log(`Server is running on: http://localhost:${PORT}`);
 })


 module.exports=app;

