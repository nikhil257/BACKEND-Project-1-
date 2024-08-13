const express = require('express');
const router = express.Router();
const Post = require('../models/postSchema');
const User = require('../models/userSchema');

router.get('/', (req, res)=>{
    res.send('Post Route');
})

router.get('/create/:userid', (req, res)=>{
    res.render('createpost', {userid : req.params.userid});
})

router.post('/create/:userid', async(req,res)=>{
    try {
        const newPost = new Post(req.body);
        newPost.user = req.params.userid;
        const post = await newPost.save();

        const user = await User.findById(req.params.userid);
        user.posts.push(post._id);
        await user.save();

        res.redirect('/');
    } catch (error) {
        res.status(500).send('Server Error');
    }
})

module.exports = router;