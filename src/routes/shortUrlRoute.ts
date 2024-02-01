import express from 'express';
import {redirectUser} from '../controllers/shortCodeController';

const router = express.Router();

router.get('/:shortCode', redirectUser);

export default router;
