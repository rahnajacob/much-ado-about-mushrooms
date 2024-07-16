//IMPORTS
const bcryptjs = require("bcryptjs")

module.exports = [
    {
        "username": "administ",
        "password": bcryptjs.hashSync("a1b2c3d4e5", 12)
      },
      {
        "username": "jane_shepard",
        "password": bcryptjs.hashSync("G7h8I9j0K1l2", 12)
      },
      {
        "username": "michael_walters",
        "password": bcryptjs.hashSync("M3n4O5p6Q7r8", 12)
      },
      {
        "username": "valerie_davis",
        "password": bcryptjs.hashSync("S9t0U1v2W3x4", 12)
      },
      {
        "username": "david_martinez",
        "password": bcryptjs.hashSync("Y5z6A7b8C9d0", 12)
      },
      {
        "username": "sarah_connor",
        "password": bcryptjs.hashSync("E1f2G3h4I5j6", 12)
      },
      {
        "username": "kurt_hansen",
        "password": bcryptjs.hashSync("K7l8M9n0O1p2", 12)
      },
      {
        "username": "vincent_walker",
        "password": bcryptjs.hashSync("Q3r4S5t6U7v8", 12)
      },
      {
        "username": "alt_cunningham",
        "password": bcryptjs.hashSync("W9x0Y1z2A3b4", 12)
      },
      {
        "username": "judy_alvarez",
        "password": bcryptjs.hashSync("C5d6E7f8G9h0", 12)
      }
]