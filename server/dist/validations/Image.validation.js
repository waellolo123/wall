"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = __importDefault(require("validator"));
const isEmpty_1 = __importDefault(require("../util/isEmpty"));
function imageValidation(req) {
    const errors = {};
    req.body.title = !(0, isEmpty_1.default)(req.body.title) ? req.body.title : "";
    if (validator_1.default.isEmpty(req.body.title)) {
        errors.title = "required title";
    }
    req.body.description = !(0, isEmpty_1.default)(req.body.description)
        ? req.body.description
        : "";
    if (validator_1.default.isEmpty(req.body.description)) {
        errors.description = "required description";
    }
    req.file = !(0, isEmpty_1.default)(req.file) ? req.file : "";
    if (!req.file.filename) {
        errors.image = "Required image";
    }
    return {
        errors,
        isValid: (0, isEmpty_1.default)(errors),
    };
}
exports.default = imageValidation;
