import { Router } from 'express';
import { Controller } from '../controllers/user.controller.js';
import { verifyToken } from '../middleware/auth.js';

const router = Router();
const userController = new Controller();
// Retrieve all users
router.get('/',verifyToken, userController.findAll);
//login
router.post('/login', userController.sign_in);
// Create a new user
router.post('/', userController.create);
// Retrieve a single user with id
router.get('/:id',verifyToken, userController.findOne);
// Update a user with id
router.put('/:id',verifyToken, userController.update);
// Delete a user with id
router.delete('/:id', verifyToken,userController.delete);


export default router