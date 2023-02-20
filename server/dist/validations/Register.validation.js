"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isEmpty_1 = __importDefault(require("../util/isEmpty"));
const validator_1 = __importDefault(require("validator"));
function RegisterValidation(data) {
    const errors = {};
    data.fullname = !(0, isEmpty_1.default)(data.fullname) ? data.fullname : "";
    if (validator_1.default.isEmpty(data.fullname)) {
        errors.fullname = "required fullname";
    }
    data.email = !(0, isEmpty_1.default)(data.email) ? data.email : "";
    if (validator_1.default.isEmpty(data.email)) {
        errors.email = "required email";
    }
    data.password = !(0, isEmpty_1.default)(data.password) ? data.password : "";
    if (validator_1.default.isEmpty(data.password)) {
        errors.password = "required password";
    }
    if (!validator_1.default.equals(data.password, data.confirm)) {
        errors.confirm = "passwords not equals";
    }
    data.confirm = !(0, isEmpty_1.default)(data.confirm) ? data.confirm : "";
    if (validator_1.default.isEmpty(data.confirm)) {
        errors.confirm = "required confirm";
    }
    return {
        errors,
        isValid: (0, isEmpty_1.default)(errors),
    };
}
exports.default = RegisterValidation;
