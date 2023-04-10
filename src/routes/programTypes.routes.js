import { Router } from "express";
import { getProgramTypes, postProgramType, getProgramTypeById, putProgramType, deleteProgramType } from "../controllers/programTypes.controlles";
import {protect, authorize, authRole } from "../controllers/users.controller";
import Role from "../helpers/role"

const router = Router()

router.get('/programTypes', getProgramTypes)
router.get('/programType/:id', getProgramTypeById)
router.post('/programType', protect, authRole(Role.Admin), postProgramType)
router.put('/programType/:id', protect, authRole(Role.Admin), putProgramType)
router.delete('/programType/:id', protect, authRole(Role.Admin), deleteProgramType)


export default router