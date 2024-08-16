const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register =async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        const user = new User({
          name,
          email,
          password: hash
        });
        await user.save();
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log('Generated Token:', token);   
       res.status(201).json({ token });
      })
    })
  }
  catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};



exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    bcrypt.compare(password, user.password, async (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error comparing passwords' });
      }
      if (result) {
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log('Generated Token:', token);
        user.tokens.push({ token });
        await user.save();
        return res.json({ token });
      } else {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from the database
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
} 

exports.getUserById = async (req, res) => {
  const userId = req.params.userId;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }  try {
      const user = await User.findById(userId);
      console.log(user) // Exclude password
      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
  } catch (error) {
      console.error('Error fetching user:', error); // Log the error for debugging
      res.status(500).json({ error: 'Server error' });
  }
};