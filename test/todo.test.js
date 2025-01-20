const request =require("supertest");
const { sequelize, Todo } = require('../models');
const app = require("../index");


describe('Todo Restful Api',()=>{
  // SAMPLE TODO
   const testTodo={
    title:"Learn About Caching",
    description:"Learn about caching and its importance,How to impliment it within 2 days"
   }
  // ENSURE DATABASE IS SYNCHRONIZED
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  // CLOSE THE SEQUELIZ CONNECTION
  afterAll(async () => {
    await sequelize.close();
  });



  //  TEST CREATING OF TODO
  describe('POST Todo /api/todos',()=>{
    // SHOULD SUCCEFULLY CREATE A TODO AND PASS THE EXPECTS
    it('Create a new TODO',async()=>{
      const res = await request(app)
      .post('/api/todos')
      .send(testTodo);


       expect(res.status).toBe(201);
       expect(res.body.title).toBe(testTodo.title);
       expect(res.body.description).toBe(testTodo.description);
       expect(res.body.id).toBeDefined();
       expect(res.body.completed).toBe(false);
    });

  //  FAIL IF TAITLE IS MISSING
    it('Should fail if title is missing',async()=>{
      const res= await request(app)
      .post('/api/todos')
      .send({description:"Test Description for our immaginary Todo"});

      expect(res.status).toBe(400)
    });

  });

  //  TEST FETCHING TODOS
  describe('GET Todos /api/todos',()=>{
   it('Should get All todos',async()=>{
    const res = await request(app)
    .get('/api/todos');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
   });
  });


  // TEST FETCHING TODO BY ID
  describe('GET Todo by ID /api/todos/:id', () => {
    it('Should get a todo by ID', async () => {
      const newTodo = await request(app)
        .post('/api/todos')
        .send(testTodo);

      const res = await request(app)
        .get(`/api/todos/${newTodo.body.id}`);

      expect(res.status).toBe(200);
      expect(res.body.title).toBe(testTodo.title);
      expect(res.body.description).toBe(testTodo.description);
      expect(res.body.id).toBe(newTodo.body.id);
    });

    it('Should return 404 if todo not found', async () => {
      const res = await request(app)
        .get('/api/todos/invalidID');

      expect(res.status).toBe(404);
    });
  });

  // TEST UPDATING TODO
  describe('PUT Todo /api/todos/:id', () => {
    it('Should update a todo', async () => {
      const newTodo = await request(app)
        .post('/api/todos')
        .send(testTodo);

      const updatedTodo = {
        title: "Updated Title",
        description: "Updated Description"
      };

      const res = await request(app)
        .put(`/api/todos/${newTodo.body.id}`)
        .send(updatedTodo);

      expect(res.status).toBe(200);
      expect(res.body.title).toBe(updatedTodo.title);
      expect(res.body.description).toBe(updatedTodo.description);
    });

    it('Should return 404 if todo to update not found', async () => {
      const res = await request(app)
        .put('/api/todos/invalidID')
        .send({ title: "Updated Title" });

      expect(res.status).toBe(404);
    });
  });

  // TEST DELETING TODO
  describe('DELETE Todo /api/todos/:id', () => {
    it('Should delete a todo', async () => {
      const newTodo = await request(app)
        .post('/api/todos')
        .send(testTodo);

      const res = await request(app)
        .delete(`/api/todos/${newTodo.body.id}`);

      expect(res.status).toBe(200);
    });

    it('Should return 404 if todo to delete not found', async () => {
      const res = await request(app)
        .delete('/api/todos/invalidID');

      expect(res.status).toBe(404);
    });
  });

});


