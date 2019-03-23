'use strict'

const koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const koaBody = require('koa-body');
const json = require("koa-json");
const CtrlContact = require('../contollers/contactcontroller')
const app= new koa();

app.use(koaBody());
app.use(bodyParser());
app.use(json());

const router = new Router();

router.get('/api/contact', CtrlContact.getContacts)  
router.get('/api/contact/:contactId', CtrlContact.getContact)  
router.post('/api/contact', CtrlContact.postContact)
router.put('/api/contact/:contactId',CtrlContact.putContact) 
router.delete('/api/contact/:contactId', CtrlContact.deleteContact)

module.exports = router
