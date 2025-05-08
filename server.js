require('dotenv').config(); // Load environment variables
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

console.log('MONGO_URI is:', process.env.MONGO_URI);
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Middleware
app.use(cors());
app.use(express.static('public')); // Serve static files from 'public' folder
app.use(bodyParser.urlencoded({ extended: false })); // Parse URL-encoded bodies
app.use(bodyParser.json()); // Parse JSON bodies

// Basic route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html'); // Assuming your index.html is in a 'views' folder or adjust path
});

const User = require('./models/user'); // Import User model
const Exercise = require('./models/exercise'); // Import Exercise model

// API routes will go here later
// Create a new user
app.post('/api/users', async (req, res) => {
    const username = req.body.username;
  
    if (!username) {
      return res.json({ error: 'Username is required' });
    }
  
    try {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.json({ username: existingUser.username, _id: existingUser._id });
      }
  
      const newUser = new User({ username });
      const savedUser = await newUser.save();
      res.json({ username: savedUser.username, _id: savedUser._id });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });

// Get all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find().select('_id username'); // Select only _id and username
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});



// Add an exercise
app.post('/api/users/:_id/exercises', async (req, res) => {
  const userId = req.params._id;
  const { description, duration, date } = req.body;

  if (!description || !duration) {
    return res.json({ error: 'Description and duration are required' });
  }

  const durationNum = parseInt(duration);
  if (isNaN(durationNum)) {
    return res.json({ error: 'Duration must be a number' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.json({ error: 'User not found' });
    }

    const exerciseDate = date ? new Date(date) : new Date();
    if (exerciseDate.toString() === 'Invalid Date') {
      return res.json({ error: 'Invalid date format' });
    }

    const newExercise = new Exercise({
      userId: userId,
      description: description,
      duration: durationNum,
      date: exerciseDate
    });

    const savedExercise = await newExercise.save();

    res.json({
      _id: user._id,
      username: user.username,
      description: savedExercise.description,
      duration: savedExercise.duration,
      date: savedExercise.date.toDateString() // Format date as required
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user's exercise log
app.get('/api/users/:_id/logs', async (req, res) => {
  const userId = req.params._id;
  const { from, to, limit } = req.query;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.json({ error: 'User not found' });
    }

    let query = { userId: userId };

    // Filter by date range
    if (from || to) {
      query.date = {};
      if (from) {
        query.date.$gte = new Date(from);
      }
      if (to) {
        query.date.$lte = new Date(to);
      }
      if (query.date.$gte && query.date.$gte.toString() === 'Invalid Date') {
         return res.json({ error: 'Invalid from date format' });
      }
      if (query.date.$lte && query.date.$lte.toString() === 'Invalid Date') {
         return res.json({ error: 'Invalid to date format' });
      }
    }

    let exercisesQuery = Exercise.find(query);

    // Apply limit
    if (limit) {
      const limitNum = parseInt(limit);
      if (!isNaN(limitNum)) {
        exercisesQuery = exercisesQuery.limit(limitNum);
      }
    }

    const exercises = await exercisesQuery.exec();

    const log = exercises.map(ex => ({
      description: ex.description,
      duration: ex.duration,
      date: ex.date.toDateString() // Format date
    }));

    res.json({
      username: user.username,
      count: exercises.length,
      _id: user._id,
      log: log
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});