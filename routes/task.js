import express from 'express';
import {newTask,getMyTask,updateTask,deleteTask} from '../controllers/task.js';
import {isAuthenticated} from "../middlewares/auth.js";


const router = express.Router();

// post
router.post('/new' ,isAuthenticated, newTask);
// get
router.get("/mytasks", isAuthenticated, getMyTask);
// update
router
  .route("/:id")
  .get(isAuthenticated, updateTask)
  .delete(isAuthenticated,deleteTask);
// delete

export default router;