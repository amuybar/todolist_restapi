const express = require("express");
const cors = require("cors");
const { sequelize } = require('./models');
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
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});


// INITIALIZING sequelize
 sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});

 module.exports=app;

