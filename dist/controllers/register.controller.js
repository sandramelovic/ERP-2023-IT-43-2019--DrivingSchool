/*import { getConnection, sql, query } from "../database"
import { postUser } from "./users.controller";
const { promisify } = require('util');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { customAlphabet } = require('nanoid');
const { ID_LENGTH, ID_ALPHABET, HASH_SALT, COOKIE_JWT } = require('../config');
const nanoid = customAlphabet(ID_ALPHABET, ID_LENGTH);

export const signup  = async (req, res) => {
    try {
      const { nameSurename, address, birthDate, jmbg, phoneNumber, role, username, password } = req.body
  
      if (nameSurename == null || jmbg == null || phoneNumber == null || username == null || password == null) {
        return res.status(400).json({ msg: "Bad Request. Please fill all fields" })
    }
    if (role == null){
        role = 0
    }
  
    try {
        const pool = await getConnection()

        password = await bcrypt.hash(password, HASH_SALT);

        await pool.request()
            .input("nameSurename", sql.VarChar, nameSurename)
            .input("address", sql.VarChar, address)
            .input("birthDate", sql.Date, birthDate)
            .input("jmbg", sql.VarChar, jmbg)
            .input("phoneNumber", sql.VarChar, phoneNumber)
            .input("role", sql.Bit, role)
            .input("username", sql.VarChar, username)
            .input("password", sql.password, password)
            .query(query.postUser)

        res.json({ nameSurename, address, birthDate, jmbg, phoneNumber, role, username, password })
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
  
      createSendToken({ id: userId, username }, res);
    } catch (err) {
      console.log(`⛔⛔⛔ SIGNUP: ${err.message}`);
      res.status(404).json({
        status: 'fail',
        message: err.message,
      });
    }
  };
  */
"use strict";