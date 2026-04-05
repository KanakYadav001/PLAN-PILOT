const UserModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


async function signUp(req, res){
 
    const { username, email, password } = req.body;

    if(!username || !email || !password){
        return res.status(400).json({ message: 'Username, email, and password are required' });
    }

    const existingUser = await UserModel.findOne({ email });
    if(existingUser){
        return res.status(400).json({ message: 'Email already in use' });
    }


    const hashedPassword = await bcrypt.hash(password, 10);

    const User = await UserModel.create({
        username,
        email,
        password: hashedPassword,
    }); 
 

    const token = jwt.sign({ userId: User._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    
    res.status(201).json({ message: 'User registered successfully', User, token });



}


async function signIn(req, res){

    const { email, password } = req.body;

    if(!email || !password){
        return res.status(400).json({ message: 'Email and password are required' });
    }

    const User = await UserModel.findOne({ email });
    if(!User){
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, User.password);
    if(!isPasswordValid){
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({  userId : User._id }, process.env.JWT_SECRET, { expiresIn: '24h' });


    res.status(200).json({ message: 'User signed in successfully', User, token });

}


module.exports = {
    signUp,
    signIn
}
    