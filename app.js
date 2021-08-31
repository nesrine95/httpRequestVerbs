"use strict "
const data = require("./data"); //data.channels[n].id  .name  .last_update
const express=require("express");
const app = express();
const port = process.env.port||3000;
app.use(express.json());

app.get("/api/channel", (req, res) => {
    //return the list of channels
    // respond with a 200
    res.json(data);
    console.log("GET", data.channels);
  });
  
  app.get("/api/channel/:id", (req, res) => {
    //return specific channel
    // respond with a 200
    let obj = data.channels.find(item => item.id == parseInt(req.params.id));
    res.json(obj);
    console.log("GET", obj);
  });
  
  app.post("/api/channel", (req, res) => {
    //add new channel then return new list
    // respond with a 201
    let { name } = req.body;
    console.log(req.body);
    let id =
      data.channels.reduce((prev, curr) => {
        return prev < curr.id ? curr.id : prev;
      }, 0) + 1;
    let last_update = Date.now();
    let obj = { id, name, last_update };
    data.channels.push(obj);
    res.status(201).json(obj);
    console.log("POST", data.channels);
  });
  //putch and put are similar but there's a slight dıfference 
  //wıth put we can check ıf the item exıst or not than ıf not add ıt 
  app.put("/api/channel/:id", (req, res) => {
    //replace a channel based on id
    // respond with 200 or 204
    // 202 if the operation is async and still pending
    // Basically an UPDATE but we could also do an INSERT if the id is available
    // Or we could choose to create a new id and do an INSERT if the id does not exist
    let id = parseInt(req.params.id);
    let name = req.body.name;
    let last_update = Date.now();
    let idx = data.channels.findIndex(item => item.id === id);
    data.channels[idx].name = name;
    data.channels[idx].last_update = last_update;
    res.status(200).json(data.channels[idx]);
    console.log("PUT", data.channels);
  });
  //patch ıs just for update it never do an insert
  app.patch("/api/channel/:id", (req, res) => {
    //edit a channel
    // respond with 200 or 204
    // 202 if the operation is async and still pending
    let id = req.params.id;
    let name = req.body.name;
    let last_update = Date.now();
    let idx = data.channels.findIndex(item => item.id === id);
    data.channels[idx].name = name;
    data.channels[idx].last_update = last_update;
    res.status(200).json(obj);
    console.log("PATCH", data.channels);
  });
  
  app.delete("/api/channel/:id", (req, res) => {
    //delete a channel
    //respond with 200 or 204
    // 202 if the operation is async and still pending
    let id = req.params.id;
    data.channels = data.channels.filter(item => item.id !== id);
    res.status(204).end();
    console.log("DELETE", data.channels);
  });
  //head is lıke get but it is used essentıally to test ıf the resources are avaılable 
  app.head("/api/channel", (req, res) => {
    //return same headers as get. no content. to check that endpoint is functional
    res.status(200).end();
  });
  
  app.options("/api/channel", (req, res) => {
    //return headers including ALLOW to say what methods are allowed
    res.status(200);
    res.set("Allow", "GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD");
    res.set("Access-Control-Allow-Origin", "*"); //cors
    //express has some cors middlewares that we can inject 
    res.set("Content-Length", "0");//we are sending no content 
    res.end();
  });
  
  /**
    '200': 'OK',
    '201': 'Created',
    '202': 'Accepted',
    '204': 'No Content',
   */
  

app.listen(port,err=>{
    if(err){
        return console.log("error",err);
    }
    console.log(`Listenıng on port ${port}`)
})