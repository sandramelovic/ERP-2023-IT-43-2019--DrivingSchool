import { getConnection, sql, query } from "../database"
import { promisify } from "util";
import * as bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { ID_LENGTH, ID_ALPHABET, HASH_SALT, COOKIE_JWT } from '../config'
import cookieParser from "cookie-parser";
import * as jwt_decode from 'jwt-decode'
import authorize from '../helpers/authorize'
import Role from "../helpers/role"

export const getUsers = async (req, res) => {
    try {
        const pool = await getConnection()
        const result = await pool.request().query(query.getUsers)
        res.json(result.recordset)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params
        const pool = await getConnection()
        const result = await pool
            .request()
            .input("id", id)
            .query(query.getUserById)

        res.send(result.recordset[0])
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params
        const pool = await getConnection()
        const result = await pool
            .request()
            .input("id", id)
            .query(query.deleteUser)

            res.status(200).json({
                success:true,
                message: "User deleted successfully"
            })
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const putUser = async (req, res) => {
    const { nameSurename, address, birthDate, jmbg, phoneNumber, username, uid, userImage } = req.body
    let role = req.body.role

    const { id } = req.params

    if (!role) {
        role = Role.User; 
      }
      

    if (nameSurename == null || jmbg == null || phoneNumber == null || username == null) {
        return res.status(400).json({ msg: "Bad Request. Please fill all fields" })
    }
    try {
        const pool = await getConnection()

        var salt = await bcrypt.genSalt(HASH_SALT);
        

        await pool.request()
            .input("nameSurename", sql.VarChar, nameSurename)
            .input("address", sql.VarChar, address)
            .input("birthDate", sql.Date, birthDate)
            .input("jmbg", sql.VarChar, jmbg)
            .input("phoneNumber", sql.VarChar, phoneNumber)
            .input("role", sql.VarChar, role)
            .input("username", sql.VarChar, username)
            .input("uid", sql.VarChar, uid)
            .input("userImage", sql.VarChar, userImage)
            .input("id", sql.Int, id)
            .query(query.putUser)


            res.status(200).json({
                success: true,
                data: { nameSurename, address, birthDate, jmbg, phoneNumber, role, username, uid, userImage }})
   //     res.json({ nameSurename, address, birthDate, jmbg, phoneNumber, role, username, password })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message: "User not found"
        })
    }

}

export const postUser = async (req, res) => {
    try {
        const { nameSurename, address, birthDate, jmbg, phoneNumber, username } = req.body
        let { password } = req.body;
        let userId = '';
        const role = Role.User

        if (nameSurename == null || jmbg == null || phoneNumber == null || username == null || password == null) {
            return res.status(400).json({ msg: "Bad Request. Please fill all fields" })
        }

        const pool = await getConnection()

        // Check if username already exists in the database
        const usernameExists = await pool
            .request()
            .input("username", sql.VarChar, username)
            .query(query.checkUsernameExists);

        if (usernameExists.recordset.length > 0) {
            return res.status(400).json({ msg: "Username already exists. Please choose a different username" });
        }

        var salt = await bcrypt.genSalt(HASH_SALT);
        password = await bcrypt.hash(password, salt);

        await pool.request()
            .input("nameSurename", sql.VarChar, nameSurename)
            .input("address", sql.VarChar, address)
            .input("birthDate", sql.Date, birthDate)
            .input("jmbg", sql.VarChar, jmbg)
            .input("phoneNumber", sql.VarChar, phoneNumber)
            .input("role", sql.VarChar, role)
            .input("username", sql.VarChar, username)
            .input("password", sql.VarChar, password)
            .query(query.postUser)

        if (!res) throw new Error('Sign up error. Please try again.');

        const result = await pool.request()
            .input("username", sql.VarChar, username)
            .query(query.findUserId)

        userId = result.recordset[0].userId

        createSendToken({ id: userId, username }, role, res);
    } catch (err) {
        console.log(`⛔⛔⛔ SIGNUP: ${err.message}`);
        res.status(404).json({
            status: 'fail',
            message: err.message,
        });
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password)
            throw new Error(`Please provide email and password`);

        const pool = await getConnection();

        const result = await pool
            .request()
            .input("username", sql.VarChar, username)
            .input("password", sql.VarChar, password)
            .query(query.loginUser);

        const user = result.recordset[0];

        if (!user || !(await correctPassword(password, user.password)))
            throw new Error('Incorrect username or password');
        // 401: Error for user not found

        createSendToken(user, user.role, res);
    } catch (err) {
        console.log(`⛔⛔⛔ LOGIN: ${err.message}`);
        res.status(401).json({
            status: 'fail',
            message: err.message,
        });
    }
};

function createSendToken(user, role, res) {
    const token = signToken(user.userId, role);
    // Cookie to store the jwt for future to verify protected routes
    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ), // To mS = D * Hs * min * mS
        httpOnly: true, // The browser will not access or modify the cookie
    };

    // Only will be send on an encrypted connection (https). In Production only we have encrypted connection
    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

    res.cookie(COOKIE_JWT, token, cookieOptions);

    // Remove the password from the output
    user.password = undefined;

    res.status(200).json({
        status: 'success',
        token,
        data: {
            user,
            role
        },
    });

}

function signToken(id, role) {
    let payload = { "id": id, "role": role };
    //let token = jwt.sign( payload,'secret',  { noTimestamp:true, expiresIn: '1h' })

    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
}
async function correctPassword(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
}

export const protect = async (req, res, next) => {
    let token;

    try {
        // 1) Getting token and check if it's there.
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            token = req.headers.authorization.split(' ')[1];
        } else if (req.cookie.jwt) {
            token = req.cookie.jwt;
        }

        if (!token)
            res.status(401).json({
                status: 'fail',
                message: 'Token not valid. Please Log in again.',
            });
        // 2) Verification token
        // const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // Of course, possible errors must be caught and handled in the error functions handler.
        // This is only an example, so I'll not do it but of course, in a real application is a must.
        // 3) Check if user still exists
        const result = await (await getConnection())
            .request()
            .query(
                `SELECT * FROM Users WHERE userId = '${decoded.id}'`
            );
        const currentUser = result.recordset[0];
        if (!currentUser) throw new Error('User not found');

        // 4) Check if user changed password after the token was issued
        // -- TO-DO

        // To access current user information in each request and templates (res.locals)
        req.user = currentUser;
        res.locals.user = currentUser;
    } catch (err) {
        res.status(401).json({
            status: 'fail',
            message: err.message,
        });
    }
    next();
}

exports.authRole = function (role) {
    return (req, res, next) => {
        if (req.user.role !== role) {
            res.status(401)
            return res.send('Not allowed')
        }

        next()
    }
}

export const logout = (req, res) => {
    res.cookie(COOKIE_JWT, 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000), // In 10sec
        httpOnly: true,
    });

    res.status(200).json({ status: 'success' });
};