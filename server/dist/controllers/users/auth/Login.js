"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_model_1 = __importDefault(require("../../../models/users.model"));
const Login_validation_1 = __importDefault(require("../../../validations/Login.validation"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// ######################### Generate token RS256 #########################/;
const GenerateToken = (payload) => {
    const privateKey = fs_1.default.readFileSync(path_1.default.join(__dirname, "../../../config/keys/private_key.pem"));
    const token = jsonwebtoken_1.default.sign(payload, privateKey, { algorithm: "RS256" });
    return token;
};
// ######################### Login Controller #########################/;
function Login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { isValid, errors } = (0, Login_validation_1.default)(req.body);
        if (!isValid) {
            return res.status(404).json(errors);
        }
        const ExistUser = yield users_model_1.default.findOne({ email: req.body.email });
        if (ExistUser) {
            /* Create user if not exist */
            const isMatch = yield bcryptjs_1.default.compare(req.body.password, ExistUser.password);
            if (!isMatch) {
                return res.status(404).json({ password: "Invalid password" });
            }
            const token = GenerateToken({
                id: ExistUser._id,
                fullname: ExistUser.fullname,
                roles: ExistUser.roles,
            });
            return res.status(200).json({ message: "success", token });
        }
        else {
            return res.status(404).json({ email: "Invalid user" });
        }
    });
}
exports.default = Login;
