require('dotenv').config();
const app = require('./src/app');
const connectionTOdb = require('./config/database.js');

connectionTOdb();

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

app.get('/', (req, res) => {
    res.send('Welcome to the Interview AI Backend!');
});

