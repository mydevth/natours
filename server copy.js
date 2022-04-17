// Server.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });   //read config file config.env
const app = require('./app');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose
  // .connect(process.env.DATABASE_LOCAL, {       //  connect toLocal DB
  .connect(DB, {                                  //  connect ot Cloud DB (Atlas)
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }).then(() => console.log('DB connection successful!'));
//  ** show connection  parameter 
// }).then((con) => {
//     console.log(con.connections);      
//     console.log('DB connection successful!');
//   });

// -- Show about ENV , var --
// console.log(app.get('env'));     
// console.log(process.env);    

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

