const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors'); // Import the cors middleware

const app = express();
const port = 3001;

const serviceAccount = require('../../adminsdk.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://flexihire-8f227-default-rtdb.firebaseio.com"
});

// Use cors middleware to enable CORS for all routes
app.use(cors());

app.get('/getUsers', async (req, res) => {
  try {
    const userRecords = await admin.auth().listUsers();
    const users = userRecords.users.map((userRecord) => userRecord.toJSON());

    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
