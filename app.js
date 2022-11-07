const express = require('express');
const app = express();
const toDoRoutes = require('./src/Routes/WishListRouter');
const dotenv = require('dotenv');
dotenv.config();

app.use(express.json());
app.use('/', toDoRoutes);

returnErrorFiles = (path) => {
  const file = fs.readFileSync(path, 'utf8');

  return file.toString();
}

app.listen(process.env.PORT, () => console.log("Aplication Started On Port: " + process.env.PORT));
