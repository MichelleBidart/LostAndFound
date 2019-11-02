const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const Document = require('../models/documents');
const {User} = require('../models/user');
/*
CRUD of documents, this is associeted to the User
*/

router.get('/:id/documents', auth ,async (req, res) => {
    const users = await User.findById(req.params.id);
    if (!users) res.status(404).send('You dont have any document for this user');

    documents = await Document.find().populate('user');
   // res.send(document);
   res.render('index', {documents:documents});
});


router.post('/:id/documents', auth ,async (req, res) => {

    const user = await User.findById(req.params.id);
    if (!user) res.status(404).send('You dont have any document for this user');
       
    let document = new Document ({
        documentNumber: req.body.documentNumber,
        user : req.params.id,
        isLost: req.body.lostOrFound == 'LOST',
        date: req.body.date,
        documentType: req.body.documentType        
    });

    document = await document.save();
    res.send(document);
});

module.exports = router; 