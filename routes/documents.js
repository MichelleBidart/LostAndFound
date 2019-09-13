const express = require('express');
const router = express.Router();

router.use(express.json());
router.use(express.static('public'));


const documents = [
    { userId: 1, documentNumber: '34098491' , isLost: true },
    { userId: 2, documentNumber: '34598491', isLost: false },
];


router.get('/documents', (req, res) => {
    res.send(documents);
});

router.get('/:id/documents', (req, res) => {
    const document = documents.find(d => d.userId === parseInt(req.params.id));
    if (!document) res.status(404).send('You dont have any document in our system');
    res.send(document);
});

router.post('/:id/documents', (req, res) => {
    const document = {
        userId: req.body.userId,
        documentNumber: req.body.documentNumber,
        isLost: req.body.isLost,
    }

    documents.push(document);
    res.send(document);
});

module.exports = router; 