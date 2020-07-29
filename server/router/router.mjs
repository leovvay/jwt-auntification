import express from 'express'
import signup from './signup.mjs'

const router = express.Router();

router.post('/signup', signup);

export default router;