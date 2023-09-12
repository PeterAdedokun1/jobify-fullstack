import { Request } from 'express';
import multer, { DiskStorage } from 'multer';

// Create a storage engine for multer
const storage: DiskStorage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb) => {
        cb(null, "public/uploads");
    },
    filename: (req: Request, file: Express.Multer.File, cb) => {
        const fileName = file.originalname;
        cb(null, fileName);
    },
});

// Create a multer instance with the specified storage engine
const upload = multer({ storage });

export default upload;