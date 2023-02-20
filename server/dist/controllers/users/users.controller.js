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
exports.DeleteById = exports.GetById = exports.List = void 0;
const users_model_1 = __importDefault(require("../../models/users.model"));
// ######################### List all users #########################/;
function List(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield users_model_1.default.find().select("-password");
        res.status(200).json(data);
    });
}
exports.List = List;
// ######################### Get user by Id #########################/;
function GetById(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        users_model_1.default
            .findById((_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id)
            .select("-password")
            .then((result) => {
            return res.status(200).json({ data: result });
        })
            .catch((err) => {
            return res
                .status(404)
                .json({ message: "Error occured contact administrator please" });
        });
    });
}
exports.GetById = GetById;
// ######################### Delete user by Id #########################/;
function DeleteById(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        users_model_1.default
            .deleteOne({ _id: (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id })
            .then((result) => {
            return res.status(200).json({ message: "User deleted with success" });
        })
            .catch((err) => {
            return res
                .status(404)
                .json({ message: "Error occured contact administrator please" });
        });
    });
}
exports.DeleteById = DeleteById;
