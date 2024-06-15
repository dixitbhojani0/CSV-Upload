import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: ((req, file, cb) => {
        cb(null, path.resolve("public", "uploads"));
    }),
    filename: ((req, file, cb) => {
        const filename = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
        cb(null, filename);
    })
});

export default multer({ storage: storage, limits: {fileSize: 1 * 1024 * 1024} });