import multer from 'multer';
import path from 'path';
import fs from 'fs';


const storage = multer.diskStorage({
destination: function (req, file, cb) {
const dir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
cb(null, dir);
},
filename: function (req, file, cb) {
const ext = path.extname(file.originalname);
const base = path.basename(file.originalname, ext).replace(/[^a-z0-9]/gi, '_').toLowerCase();
cb(null, `${base}_${Date.now()}${ext}`);
},
});


const fileFilter = (req, file, cb) => {
const allowed = ['image/jpeg', 'image/png', 'image/webp'];
if (allowed.includes(file.mimetype)) cb(null, true);
else cb(new Error('Only JPG/PNG/WebP images are allowed'));
};


export const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });