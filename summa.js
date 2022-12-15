
const express = require('express')
const app = express();
const axios =require('axios');

// // routes.post('/adminLogin',(req,res)=>{
// //     if(req.body.name === 'admin' && req.body.password === '12345'){
// //         res.status(200).json({data :"Login Successful"})

// //     }
// //     else if(req.body.name === 'null'){
// //         res.status(404).json({data:"err"})
// //     }
// //     else{
// //         res.redirect('/login'); 
// //     }
// // })

async function sendmail(email,text) {
     response = await fetch('/admin/sendMail/' + email)
     //console.log(id);
     let result = await (response.json())
     //console.log(result);

}

// // async function sucmail(email,id,suctext){
// //     sendmail(email, id,suctext);
// //     var ajxReq = await $.ajax({
// //         url: 'https://638f5b8c4ddca317d7f644f9.mockapi.io/form_pg/' + id,
// //         type: 'DELETE',
// //         async: false,
// //         dataType: 'json',
// //         enctype: 'multipart/form-data',
// //         success: function (data) {

// //         },
// //         error: function (jqXhr, textStatus, errorMessage) {

// //         }
// //     });
// // }

app.get('/sendMail/:email/:info',(req,res)=>{
     var transporter = nodemailer.createTransport({
         service: 'gmail',
         auth: {
           user: 'teamnestor2022@gmail.com',
           pass: 'nsggvnufesgmpdxm'
         }
       });
      
      
       var mailOptions = {
         from: 'teamnestor2022@gmail.com',
         to: req.params.email,
         subject: 'REGARDING TICKET BOOKING DETAILS',
         text: 'Hi sir/mam, here is your booking details '+req.params.text
       };
      
       transporter.sendMail(mailOptions, function(error, info){
         if (error) {
           console.log(error);
         } else {
           console.log('Email sent: ' + info.response);
           res.status(200).json({data:"Success"})
         }
       }); 
})
//module.exports=routes;

 app.listen(1811,(res,req)=>{
     console.log('server is connected on port 1811');
})