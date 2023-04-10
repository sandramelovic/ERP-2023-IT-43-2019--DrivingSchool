import { Router } from "express";
import { getInstructorById, getInstructors, postInstructor, putInstructor, deleteInstructor } from "../controllers/instructors.controller";
import {protect, authorize, authRole } from "../controllers/users.controller";
import Role from "../helpers/role"

const router = Router()

router.get('/instructors', getInstructors)
router.get('/instructor/:id', getInstructorById)
router.post('/instructor', protect, authRole(Role.Admin), postInstructor)
router.put('/instructor/:id', protect, authRole(Role.Admin), putInstructor)
router.delete('/instructor/:id', protect, authRole(Role.Admin), deleteInstructor)


export default router