const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const router = express.Router();

//register page
router.get('/register', (req, res) => {
    res.render('register')
});

router.post('/register', async (req, res) => {
    
    //Validation
    
    const emailExist = await User.findOne({ email: req.body.email });

    if (req.body.password!==req.body.confirm_password && emailExist)
    return res.status(400).render('register', {
        emailError: 'Email allaqachon ro\'yxatdan o\'tgan',
        matchError: 'Parol mos emas'
    }); 

    if (emailExist) {
        return res.status(400).render('register', {
            emailError: 'Email allaqachon ro\'yxatdan o\'tgan'
        }); } else {
            if (req.body.password!==req.body.confirm_password)
            return res.status(400).render('register', {
                matchError: 'Parol mos emas'
            });            
        } 

        
        
    
    

    //hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    });

    try {
         await user.save();
        res.redirect('/login');
    } catch (error) {
        res.status(400).send('Bad request')
    }
});


//login page
router.get('/login', (req, res) => {
    res.render('login')
});


router.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
    return res.status(400).render('login', {
        emailError: 'Bunday fordalanuvchi mavjud emas!'
    });

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass)
        return res.status(400).render('login', {
            matchError: 'Parol xato' 
        }); 

    try {
        res.render('dashboard', {
            user: user.username
        });
        res.redirect('/dashboard');
        console.log(user.username);
    } catch (error) {
        res.status(400).send('Bad request!');
    } 
    
       

}); 


module.exports = router;