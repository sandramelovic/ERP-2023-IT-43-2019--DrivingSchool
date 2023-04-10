import { Router } from "express";
import { getVehicles, getVehicleById, postVehicle, putVehicle, deleteVehicle } from "../controllers/vehicles.controlles";
import {protect, authorize, authRole } from "../controllers/users.controller";
import Role from "../helpers/role"

const router = Router()

router.get('/vehicles', getVehicles)
router.get('/vehicle/:id', getVehicleById)
router.post('/vehicle', protect, authRole(Role.Admin), postVehicle)
router.put('/vehicle/:id', protect, authRole(Role.Admin), putVehicle)
router.delete('/vehicle/:id', protect, authRole(Role.Admin), deleteVehicle)


export default router