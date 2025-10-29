import express from 'express';
import upload from '../middleware/upload.js';
import { uploadPaymentScreenshot, submitPaymentProof } from '../controllers/paymentController.js';

const router = express.Router();

// Upload payment screenshot
router.post('/upload-screenshot', upload.single('screenshot'), uploadPaymentScreenshot);

// Submit payment proof
router.post('/submit-proof', submitPaymentProof);

export default router;