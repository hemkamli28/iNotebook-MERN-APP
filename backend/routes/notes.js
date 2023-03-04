const express = require('express'); 
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');
const Note = require('../models/Notes');
const { body, validationResult } = require('express-validator');


router.get('/getallnotes',fetchUser, async (req, res)=>{

    try {
        const notes = await Note.find({user: req.user.id});
        res.json(notes);
    } catch (error) {
        console.error(error.message)
        res.sendStatus(500).send("Internal Server Error");
    }
});

router.post('/addnote', fetchUser, [
    body('title','Enter a valid Title').isLength({ min: 3 }),
    body('description','Enter a valid data in description').isLength({ min: 5 }),

], async(req, res)=>{

    try {
        
        const {title, description, tag} = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.sendStatus(400).json({ errors: errors.array() });
        }
    
        const note =  new Note({
            title, description, tag , user : req.user.id
        })
        const savedNote = await note.save()
        res.json(savedNote) ;
    } catch (error) {
        console.error(error.message)
        res.sendStatus(500).send("Internal Server Error");
    }
})



router.put('/updatenote/:id', fetchUser, [
    body('title','Enter a valid Title').isLength({ min: 3 }),
    body('description','Enter a valid data in description').isLength({ min: 5 }),

], async(req, res)=>{
    const {title, description, tag} = req.body;
    const newNote = {};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};

    let note = await Note.findById(req.params.id);
    if(!note){
        return res.status(404).send("Not Found");
    }
    
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed");
    }

    note =  await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true});
    res.json(note);
})

router.delete('/deletenote/:id', fetchUser, async(req, res)=>{
    const {title, description, tag} = req.body;
   

    let note = await Note.findById(req.params.id);
    if(!note){
        return res.status(404).send("Not Found");
    }
    
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed");
    }

    note =  await Note.findByIdAndDelete(req.params.id);
    res.json({"Success":"Note has been Deleted...!",note : note});
})
module.exports = router;