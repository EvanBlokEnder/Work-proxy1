
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
const router = express.Router();

// Robust way to get __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, '../public');


// Helper to send a file and handle errors
function sendHtml(res, file) {
	res.sendFile(path.join(publicDir, file), err => {
		if (err) {
			res.status(err.statusCode || 500).sendFile(path.join(publicDir, 'err.html'));
		}
	});
}

router.get('/', (req, res) => sendHtml(res, 'index.html'));
router.get('/&', (req, res) => sendHtml(res, '&.html'));
router.get('/~', (req, res) => sendHtml(res, '~.html'));
router.get('/g', (req, res) => sendHtml(res, 'g.html'));
router.get('/a', (req, res) => sendHtml(res, 'a.html'));
router.get('/err', (req, res) => sendHtml(res, 'err.html'));
router.get('/500', (req, res) => sendHtml(res, '500.html'));
router.get('/password', (req, res) => sendHtml(res, 'password.html'));

// 404 handler
router.use((req, res) => {
	res.status(404).sendFile(path.join(publicDir, 'err.html'));
});

export default router;
