import { Router } from "express";
import { getUserById, getUsers, postUser, putUser, deleteUser, login, protect, authorize, authRole } from "../controllers/users.controller";
import Role from "../helpers/role"
import {canViewUsers} from '../permissions/users.permissions'

const router = Router()

router.get('/users', protect, authRole(Role.Admin), getUsers)
router.get('/user/:id', protect, authRole(Role.Admin), getUserById)
router.post('/user', postUser)
router.put('/user/:id', protect, authPutUser, putUser)
router.delete('/user/:id', protect, authRole(Role.NoOneCan), deleteUser)
router.post('/login', login)

router.get("/free-endpoint", (req, res) => {
    res.json({ message: "You are free to access me anytime" });
  });
  
router.get('/auth-endpoint', protect, (req, res) => {
    res.json({ message: "You are authorized to access me" });
  });

router.get('/admin', protect, authRole(Role.Admin), getUsers); // admin only


function authPutUser(req, res, next) {
  if (!canViewUsers(req.user, req.params.id)) {
    res.status(401)
    return res.send('Not Allowed')
  }

  next()
}

export default router