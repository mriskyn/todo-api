const express = require('express');
const cors = require('cors');
const router = require('./routes');

const PORT = 4050;

const app = express();

app.use(express.json());
app.use(cors());

app.use('/v1', router);

app.listen(PORT, () => console.log('Server running on port'));
