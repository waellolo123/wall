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
const Register_validation_1 = __importDefault(require("../../../validations/Register.validation"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// ######################### Register Controller #########################/;
function Register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { isValid, errors } = (0, Register_validation_1.default)(req.body);
        if (!isValid) {
            return res.status(404).json(errors);
        }
        const ExistUser = yield users_model_1.default.findOne({ email: req.body.email });
        if (!ExistUser) {
            /* Hash password */
            const hash = bcryptjs_1.default.hashSync(req.body.password, 10);
            req.body.password = hash;
            /* Create user if not exist */
            yield users_model_1.default.create(req.body)
                .then((result) => res.status(201).json({
                message: "success",
            }))
                .catch((err) => console.log(err));
        }
        else {
            return res.status(404).json({ email: "Email exist try with another" });
        }
    });
}
exports.default = Register;
