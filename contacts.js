
const fs = require("fs/promises")
const path = require("path")
const shortid = require('shortid')
const contactsPath = path.join(__dirname, "db/contacts.json")

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath)
    console.table(JSON.parse(data))
  } catch (err) {
    console.log(err.message)
  }
}
// function listContacts() {
//     fs.readFile(contactsPath, (err, data) => {
//       if (err) {
//         console.log(err.message)
//       }
//       console.table(JSON.parse(data.toString))
//     })
//   }

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath)
    const allContacts = JSON.parse(data)
    const foundContact = allContacts.find(
      (contact) => contact.id === Number(contactId)
    )
    console.table(foundContact ? foundContact : 'Contact undefined')
  } catch (err) {
    console.log(err.message)
  }
}

// function getContactById(contactId) {
//     fs.readFile(contactsPath, (err, data) => {
//       if (err) {
//         console.log(err.message)
//       }
//       const allContacts = JSON.parse(data)
//       const contact = allContacts.find(({ id }) => id === Number(contactId))
//       if (contact === undefined) {
//         console.log('Contact undefined')
//         return
//       }
//       console.table(contact)
//     })
//   }

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath)
    const allContacts = JSON.parse(data)
    const user = {
      id: shortid.generate(),
      name,
      email,
      phone,
    }

    allContacts.push(user)
    await fs.writeFile(contactsPath, JSON.stringify(allContacts))
    console.log(`Contact ${name} added`)
  } catch (err) {
    console.log(err.message)
  }
}
//function addContact(name, email, phone) {
  //   fs.readFile(contactsPath, (err, data) => {
  //     if (err) {
  //       console.log(err.message)
  //       return
  //     }
  //     const contacts = JSON.parse(data)
  //     // JSON.stringify(data)
  //     const newContact = {
  //       id: shortid.generate(),
  //       name,
  //       email,
  //       phone
  //     }
  //     if (contacts.find(contact => contact.name === name)) {
  //       console.log('This name exist')
  //       return
  //     }
  //     contacts.push(newContact)
  
  //     fs.writeFile(contactsPath, JSON.stringify(newContact, null, '\t'), (err, _) => {
  //       if (err) {
  //         console.log(err.message)
  //       }
  //       console.log(`Contact ${name} added`)
  //     })
  //     listContacts()
  //   })
  // }
async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath)
    const allContacts = JSON.parse(data)
    const newContacts = allContacts.filter(
      (contact) => !(contact.id === Number(contactId))
    )

    if (allContacts.length === newContacts.length) {
      console.log('Contact undefined')
    } else {
      await fs.writeFile(contactsPath, JSON.stringify(newContacts))
      console.log('Contact deleted')
    }
  } catch (err) {
    console.log(err.message)
  }
}
// function removeContact(contactId) {
//   fs.readFile(contactsPath, (err, data) => {
//     if (err) {
//       console.log(err.message)
//     }
//     const allContacts = JSON.parse(data)
//     const newContacts = allContacts.filter(({ id }) => id.toString !== contactId)
//     if (newContacts === undefined) {
//       console.log('Contact undefined')
//     }
//     fs.readFile(contactsPath, JSON.stringify(newContacts))
//     console.log('Contact deleted')
//     listContacts()
//   })
// }

module.exports = { listContacts, getContactById, removeContact, addContact }