//IMPORTS
const express = requires("express")
const bcryptjs = require("bcryptjs")
const router = express.Router()

//MODEL
const User = require("../models/user.js")