//  Importing Libraries
const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser')

// Token 
const JWT_SECRET = "AHmedisagoodb$oy";


// ROUTE 1 : Create a user using: POSt "/api/auth/createuser". No login required 

router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
    body('email', 'Enter a valid email').isEmail()
], async (req, res) => {
    let success= false;

        // If there are errors , return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({success, errors: errors.array() });
        }

    try {
        // Check weather the user with this email exist already
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success, error: "Sorry a user with this email alreay exist " })
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt)
        
        // Create a new user
        
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        })
        const data={
            user:{
                id: user.id,
            }
        }

        const authtoken = jwt.sign(data, JWT_SECRET);
        
        // res.json(user)
        success= true;
        res.json({success, authtoken})

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error ")
    }
})

// ROUTE 2 : Authenticate a user using: POST "/api/auth/login". No login required 
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password Cant be blank').exists()
], async (req, res) => {
    let success= false;

    // If there are errors , return bad request and the errors

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {email, password} = req.body;
        try {
            let user =await User.findOne({email});
            if(!user){
            success= false;
            return res.status(400).json({error: "Please try to login with correct credentials"});
            }

            const passowordCompare = await bcrypt.compare(password, user.password)
            if(!passowordCompare){
                success = false;
                return res.status(400).json({success, error: "Please try to login with correct credentials"});
            }

            const data={
                user:{
                    id: user.id
                }
            }
            const authtoken = jwt.sign(data, JWT_SECRET);
            success = true;
            res.json({success, authtoken})

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error ")
        }

})

// ROUTE 3 : Get logged in user details using : POST "/api/auth/getuser".  Login required
router.post('/getuser', fetchuser, async (req, res) => {
try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error ")
}
})
module.exports = router