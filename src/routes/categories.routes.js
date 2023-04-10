import { Router } from "express";
import { getCategories, getCategoryById, postCategory, putCategory, deleteCategory } from "../controllers/categories.controller";
import {protect, authorize, authRole } from "../controllers/users.controller";
import Role from "../helpers/role"

const router = Router()

router.get('/categories', getCategories)
router.get('/category/:id', getCategoryById)
router.post('/category', protect, authRole(Role.Admin), postCategory)
router.put('/category/:id', protect, authRole(Role.Admin), putCategory)
router.delete('/category/:id', protect, authRole(Role.Admin), deleteCategory)


export default router