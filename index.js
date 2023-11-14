const express = require('express');
const port = 8000;
const path = require('path');
const app = express();
const db = require('./config/mongoose')
const Contact = require('./models/contact');

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

var contactList = [
    {
        name : "Rashi",
        phoneNo : "1234567890",
    },
    {
        name : "Rashi Smita",
        phoneNo : "8888888888",
    }
]
app.get('/',function(req,res)
{
    // res.send('<h1>Yay!! It is running, or is it?</h1>')
    Contact.find({},function(err,contacts)
    {
        if(err)
        {
            console.log('Error in fetching the contacts from db');
            return;
        }
    
        return res.render('home',{
            title:'Contact List',
             contact_list : contacts
         });
    });
});

app.get('/playground',function(req,res)
{
    return res.render('playground',{title:'Let us play'});
});

app.post('/create-contact',function(req,res)
{
   // contactList.push(req.body);
   Contact.create({
        name : req.body.name,
        phoneNo : req.body.phoneNo
   },function(err,newContact)
   {
    if(err)
    {
        console.log('Error in creating the contact');
        return;
    }
    console.log('**********',newContact);
   });
    return res.redirect('back');
   // return res.redirect('/playground');
});

//for deleting a contact
app.get('/delete-contact',function(req,res)
{
    //get the id from the query in the ul
    // console.log(req.query.id);
    let id = req.query.id;
  //  let phone = req.query.phone;

  //find the contact in the database using id and delete
    Contact.findOneAndDelete(id,function(err){
    if(err)
    {
        console.log('Error in deleting an object from database');
        return;
    }
    /*let contactIndex = contactList.findIndex(contact => contact.phoneNo == phone);
    if(contactIndex!=-1)
    {
        contactList.splice(contactIndex,1);
    }*/
    return res.redirect('back');
    });
});
app.listen(port,function(err)
{
    if(err)
    {
        console.log('Cannot run on express server',err);
    }
    console.log('Server is running on port: ',port);
});