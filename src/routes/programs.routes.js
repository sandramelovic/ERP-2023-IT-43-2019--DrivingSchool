import { Router } from "express";
import { getProgramById, getPrograms, deleteProgram, putProgram, postProgram } from "../controllers/programs.controller";
import {protect, authorize, authRole } from "../controllers/users.controller";
import Role from "../helpers/role"

const router = Router()

router.get('/programs', getPrograms)
router.get('/programs/:id', getProgramById)
router.post('/programs', protect, authRole(Role.Admin), postProgram)
router.put('/programs/:id', protect, authRole(Role.Admin), putProgram)
router.delete('/programs/:id', protect, authRole(Role.Admin), deleteProgram)


export default router