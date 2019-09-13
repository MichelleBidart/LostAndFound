const express = require('express');
const router = express.Router();

router.use(express.json());
router.use(express.static('public'));


const documents = [
    { userId: 1, documentNumber: '34098491' , isLost: true },
    { userId: 2, documentNumber: '34598491', isLost: false },
];


router.get(':id/documents', (req, res) => {
    const document = documents.find(d => d.userId === parseInt(req.params.id));
    if (!document) res.status(404).send('You dont have any document in our system');
    res.send(document);
});

/*router.post('/', (req, res) => {
    const user = {
        id: documents.length + 1,
        mail: req.body.mail,
        password: req.body.password,
    }

    documents.push(user);
    res.send(user);

});*/

module.exports = router; 