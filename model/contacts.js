const fs = require('fs')
// const contacts = require('./contacts.json')
const { promises: fsPromise } = fs
const path = require('path')
const contactsPath = path.join(__dirname, 'contacts.json')
const shortid = require('shortid')
const chalk=require('chalk')

const listContacts = async () => {
  try {
    const contacts = await fsPromise.readFile(contactsPath, 'utf-8');
		return JSON.parse(contacts)
  } catch (err) {
    errHandle(err)
  }
}

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts()
		return contacts.find(({id})=>id == contactId )
  } catch (err) {
    errHandle(err)
  }
}



const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts()
    const newContacts = contacts.filter(
      ({id}) => id !== contactId)
    
    await fsPromise.writeFile(contactsPath, JSON.stringify(newContacts));
  } catch (err) {
    errHandle(err)
}
}

const addContact = async (body) => {
  try {
      const contacts = await listContacts()
      const id = shortid.generate()
      const newContact = { id, ...body }
      const newList = [...contacts, newContact]
    await fsPromise.writeFile(contactsPath, JSON.stringify(newList))
  } catch (err) {
    errHandle(err)
  }
}



const updateContact = async (contactId, body) => {
 try{const contacts = await listContacts()
  const contact = contacts.find(({ id }) => id == contactId)
  Object.assign(contact, body)
  await fsPromise.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return contact
}
catch (err){
  errHandle(err)
}
  
}


function errHandle(err) {
	console.log(chalk.red(err));
	process.exit(1);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
