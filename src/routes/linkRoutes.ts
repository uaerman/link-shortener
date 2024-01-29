import express from 'express';
import {createShortLink} from '../controllers/linkController';

const router = express.Router();

router.post('/api/short-url', createShortLink);

export default router;
