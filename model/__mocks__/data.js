const contacts = [
    {
        "favorite": false,
        "_id": "60a771b15a0ad7365adf5aaa",
        "name": "Allen1 Raymond1",
        "email": "nulla1.ante@vestibul.co.uk",
        "phone": "(222) 914-3792",
        "owner": "609e2557475a3f6bd376f6e6",
        "createdAt": "2021-05-21T08:39:13.479Z",
        "updatedAt": "2021-05-21T08:39:13.479Z"
    },
    {
        "favorite": false,
        "_id": "60a771b15a0ad7365adf5aab",
        "name": "Allen2 Raymond2",
        "email": "nulla2.ante@vestibul.co.uk",
        "phone": "(111) 914-3791",
        "owner": "609e2557475a3f6bd376f6e6",
        "createdAt": "2021-05-21T08:39:13.479Z",
        "updatedAt": "2021-05-21T08:39:13.479Z"
    },
  ]
  
  const newContact = {
    name: 'New',
    email: "new@test.ua",
    phone: "(000) 914-3791",
    favorite:false,
  }
  
  const User = {
    name: 'Guest',
    subscription: 'pro',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNDc4MGIwYTMzZjU5M2I1ODY2ZDcwZCIsImlhdCI6MTYxNTMzNDc0NCwiZXhwIjoxNjE1MzM4MzQ0fQ.ZOul5xw2qGjRiFVXE4eKyIcJJ3ubRsVcmlXSm-KzNzg',
    idCloudAvatar: null,
    _id: '604780b0a33f593b5866d70d',
    id: '604780b0a33f593b5866d70d',
    email: 'test007@ex.ua',
    password: '$2a$08$ebkI0zFk0IBoStiDDhyzr.9y0BqToGXPtrcTqcMErEuk4JHHF3K8O',
    updatedAt: '2021-03-10T00:05:44.937Z',
    avatar:
      'https://s.gravatar.com/avatar/d6ac26ce64657b23fce03f68f65dc6b4?s=250',
  }
  
  const users = []
  users[0] = User
  
  const newUser = { email: 'test@test.com', password: '123456' }
  
  module.exports = { contacts, newContact, User, users, newUser }