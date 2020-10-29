import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin',
    email: 'admin@proshop.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'kanth',
    email: 'kanth@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Lakshmikanth',
    email: 'kanth1997.9036@gmial.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users