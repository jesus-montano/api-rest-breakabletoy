'use strict'
const Contact = require('../models/contact')

async function  getContacts(ctx){
    try{
        const {page, name, lastname} =ctx.query
        const options={
            page: page||1, 
            limit:10
                }
        const query = {};

        if (name || lastname) {
            query.$and = [];
            name && query.$and.push({ name: new RegExp(name, 'i') });
            lastname && query.$and.push({ lastname: new RegExp(lastname, 'i') });
        }
        const contact = await Contact.paginate(query,options)
        ctx.body = contact}
    catch(err){
        console.log(err)
    }
}
async function  getContact(ctx){
   try{ 
    const id = ctx.params.contactId
    console.log(ctx.params.contactId)
   const contact = await Contact.findById(id)
   console.log(contact)
   ctx.body = contact
    }catch(err){
        console.log(err)
    }

    
}
async function  postContact(ctx){
    try{
    const clientContact = ctx.request.body;
    let contact = new Contact(clientContact);
    console.log(contact);
    const savedContact = await contact.save()
    ctx.body= savedContact
    }catch(err){
        console.log(err)
    }
    
}
async function  putContact(ctx){
    try{const id = ctx.params.contactId
    const contact = await Contact.findByIdAndUpdate(id, ctx.request.body)
   
    ctx.body = contact
    }catch(err){
        console.log(err)
    }
    
}
async function  deleteContact(ctx){
    try{const id = ctx.params.contactId
    const contact = await Contact.findById(id)

    const deletedContact = await contact.remove()
    ctx.body = deletedContact
    }catch(err){
        console.log(err)
    }
    
}
module.exports ={
    getContact,
    getContacts,
    postContact,
    putContact,
    deleteContact
}