const express = require('express');
const router = express.Router();

//register page
router.get('/', (req, res) => {
    res.render('dashboard')
});





module.exports = router;