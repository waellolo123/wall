"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
// Define the function that generates the dynamic destination path
function getDynamicDestination(req, file) {
    const { _id } = req.user;
    return `public/images/${_id}/`;
}
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        // Check if the uploads directory exists
        if (!fs_1.default.existsSync(getDynamicDestination(req, file))) {
            // Create the uploads directory if it doesn't exist
            fs_1.default.mkdirSync(getDynamicDestination(req, file));
        }
        // Call the callback function with the destination path
        cb(null, getDynamicDestination(req, file));
    },
    filename(req, file, cb) {
        const uniqueSuffix = Date.now() +
            "-" +
            Math.round(Math.random() * 1e9) +
            path_1.default.extname(file.originalname);
        cb(null, file.fieldname + "-" + uniqueSuffix);
    },
});
const Upload = (0, multer_1.default)({
    storage,
    limits: { fileSize: 4000000 },
    fileFilter(req, file, cb) {
        checkFileType(file, cb);
    },
}).single("image");
// Check File Type
function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path_1.default.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    }
    else {
        cb("Error: Formt image not valid!");
    }
}
exports.default = Upload;
