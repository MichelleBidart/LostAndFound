const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const Document = require('../models/documents');
const {User} = require('../models/user');

//Mail
const util = require('util');
const nodemailer = require('nodemailer');

/*
CRUD of documents, this is associeted to the User
*/

router.get('/:id/documents', auth ,async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) res.status(404).send('You dont have any document for this user');

    //document = await Document.find('user:user')
    documents = await Document.find({user:user}).populate('user');
   // res.send(document);
   res.render('index', {
                            documents:documents,
                            user:user
                        }
                    );
});

router.put('/:userId/documents/:documentId', auth ,async (req, res) => {

  
  const user = await User.findById(req.params.userId);
  if (!user) res.status(404).send('You dont have any document to update');

  console.log('update document user id' + req.params.documentId);

  const document = await Document.findById(req.params.documentId)
  .catch(err => console.error("err", err));

  console.log(document);

  res.render('documents', {document: document});
});

router.delete('/:userId/documents/:documentId', auth ,async (req, res) => {

    console.log('entraaaaa');
  
    const user = await User.findById(req.params.userId);
    if (!user) res.status(404).send('You dont have any document for this user to delete');
    console.log('delete document user id' + req.params.documentId);
    const document = await Document.findByIdAndRemove(req.params.documentId)
    .catch(err => console.error("err", err));

    res.redirect(util.format('/users/%s/documents', user._id));

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

    //If it's already reported, notify. 
    console.log('search document');

    Document.findOne({ 'documentNumber': req.body.documentNumber,
                            'isLost' : !document.isLost}, function (err, doc) {
                                if (err || doc == undefined) { return; }
                                console.log('document found' + doc);
                              if (doc.isLost)  {
                                console.log('doc was reported as lost.');
                                User.findOne({ '_id': doc.user._id}, function (err, alterUser) {                                 
                                    // Grab the the current loggued user email from db. 
                                    User.findOne({ '_id': req.user_id}, function (err, currentUser) { 
                                        notifyFoundDocument(alterUser.email, currentUser.email);
                                    });
                                });
                              } else {
                                console.log('doc was reported as found.');
                                User.findOne({ '_id': doc.user._id}, function (err, alterUser) {                                 
                                    // Grab the the current loggued user email from db. 
                                    User.findOne({ '_id': req.user_id}, function (err, currentUser) { 
                                        notifyFoundDocument(currentUser.email, alterUser.email);
                                    });
                                });
                              }
    });

    res.redirect(util.format('/users/%s/documents', user._id));
});

function notifyFoundDocument(destinationEmail, alterEmail){
    if (!destinationEmail) { return; }

      var htmlBody = '<p><b>Hola!</b></p>' +
      '<p>Tu documento fue encontrado!</p>' +
      '<p>Podés enviar un mail a %s para recuperarlo. </p>'
  
      const send = require('gmail-send')({
        user: 'lost.and.found.up@gmail.com',
        pass: 'Gorriti3758',
        to:   destinationEmail,
        subject: 'Tu documento fue encontrado',
      });

      send({ 
        html: util.format(htmlBody, alterEmail),  
      }, (error, result, fullResult) => {
        if (error) {
            console.error(error);
            return;
        }
        console.log(result);
        console.log(fullResult);
      });
}
module.exports = router; 
