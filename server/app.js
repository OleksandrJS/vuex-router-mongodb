/** @format */

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();

dotenv.config();

app.use(cors());
app.use(express.json({ extended: true }));

mongoose.connect(
  `mongodb+srv://oleksandr:${process.env.MONGODB_SECRET}@cluster0.gxy67.mongodb.net/admin-vue-test`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  console.log('Database connected'),
);

app.get('/', (req, res) => {
  res.send('Hello');
});

app.use('/api', require('./routers/user.routes'));
app.use('/product', require('./routers/product.routes'));

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`Server run at port: ${PORT}`);
});
