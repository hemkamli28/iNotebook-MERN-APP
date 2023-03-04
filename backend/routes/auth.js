const express = require('express'); 
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser');

const JWT_SECRET = "myname$isHemKamli";
router.post('/createuser', 
[
    body('username','Enter a valid Username').isLength({ min: 4 }),
    body('email','Enter a valid Email').isEmail(),
    body('password','Enter a Strong Password with minimum 7 characters').isLength({ min: 7 })
], 
async (req, res)=>{
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }

try{
    let user = await User.findOne({email: req.body.email});
    if(user){
        return res.status(400).json({success, error: "Email already exists"})
    }
    
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    user = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: {
            id: user.id
        }
    }
    console.log(JWT_SECRET);
    const authToken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({success, authToken})
  
}
      
    catch(err)
    {
        console.log(err.message)
        res.status(500).send("Internal Server Error")
    }
})

router.post('/login', [
    body('email','Enter a valid email').isEmail(),
    body('password','Password can not be empty').exists()
], async(req,res)=>{
    let success= false;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;
    try{
        let user = await User.findOne({email});
        if(!user){
            success = false; 
            return res.status(500).json({error:"Please Enter Correct Credentials"});
        }

        const passwordCompare = await bcrypt.compare(password, user.password)
        if(!passwordCompare){
            success = false; 
            return res.status(500).json({success, error:"Please Enter Correct Credentials"});
        }

        const data = {
            user: {
                id: user.id
            }
        }
        console.log(JWT_SECRET);
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, authToken})

    }catch(error){
        console.error(error.message);
        res.sendStatus(500).send("Internal server Error");
    }
})


router.post('/getuser', fetchUser, async(req,res)=>{
try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error");
}
}); 

module.exports = router;