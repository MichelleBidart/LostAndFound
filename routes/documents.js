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
    //If it's already reported, notify. 
    console.log('search document');

    Document.findOne({ 'documentNumber': req.body.documentNumber,
                            'isLost' : !document.isLost}, function (err, doc) {

            if (!err && doc) {
                console.log(doc);
                console.log('document found.');
                //if there is a match, notify
                if (doc.isLost) {
                    console.log('doc was reported as lost.');
                    User.findOne({ '': req.body.documentNumber, 'isLost' : !document.isLost}, 
                    function (err, doc) {
                        if (!err && doc) {
                            notifyFoundDocument(user.email);
                        } else {
                            //TODO: redirect to proper view. 
                        }
                    });
                } else {
                    console.log('doc was reported as found.');
                }
            } else {
                console.log('document not found.');
            }
    });
});

function notifyFoundDocument(usermail){
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      sendmail: true,
      //host: 'mail.smtp.gmail.com',
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
          //user: 'lost.and.found.up@gmail.com',
          //pass: 'Gorriti3758'
          user: 'nico.kilback@ethereal.email',
          pass: 'dF9kRev7XyARAzuKYG'
      },
      tls:{
        rejectUnauthorized:false
      }
    });

    var htmlBody = '<p><b>Hola!</b></p>' +
    '<p>Tu DNI fue encontrado!</p>' +
    '<p>Podés enviar un mail a %s para recuperarlo. </p>'

    // setup email data with unicode symbols
    let mailOptions = {
        from: 'lost.and.found.up@gmail.com', // sender address
        to: 'Martín Brude <martin.brude@gmail.com>', // comma separated list of recipients
        //bcc: 'Michelle Bidart <bidart.michelle@gmail.com>',
        subject: 'Tu DNI fue encontrado', // Subject line
        text: 'Hola!', // plain text body
        html: util.format(htmlBody, usermail)
    };
  
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.response);   
    });
}
module.exports = router; 
