"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Login_1 = __importDefault(require("../controllers/users/auth/Login"));
const Logout_1 = __importDefault(require("../controllers/users/auth/Logout"));
const Register_1 = __importDefault(require("../controllers/users/auth/Register"));
const users_controller_1 = require("../controllers/users/users.controller");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const findUserMiddleware_1 = require("../middleware/findUserMiddleware");
const roleMiddleware_1 = require("../middleware/roleMiddleware");
const router = express_1.default.Router();
// ######################### User router #########################/;
/*
 * Method("POST")
 * Public
 */
router.post("/register", Register_1.default);
/*
 * Method("POST")
 * Public
 */
router.post("/login", Login_1.default);
/*
 * Method("POST")
 * Public
 */
router.post("/logout", Logout_1.default);
/*
 * Method("GET")
 * Private
 */
router.get("/users", authMiddleware_1.default, findUserMiddleware_1.FindUser, (0, roleMiddleware_1.inRole)(roleMiddleware_1.ROLES.ADMIN, roleMiddleware_1.ROLES.DEVELOER), users_controller_1.List);
/*
 * Method("GET")
 * Param(":id")
 * Private
 */
router.get("/users/:id", authMiddleware_1.default, findUserMiddleware_1.FindUser, (0, roleMiddleware_1.inRole)(roleMiddleware_1.ROLES.ADMIN, roleMiddleware_1.ROLES.DEVELOER), users_controller_1.GetById);
/*
 * Method("DELETE")
 * Param(":id")
 * Private
 */
router.delete("/users/:id", authMiddleware_1.default, findUserMiddleware_1.FindUser, (0, roleMiddleware_1.inRole)(roleMiddleware_1.ROLES.ADMIN, roleMiddleware_1.ROLES.DEVELOER), users_controller_1.DeleteById);
exports.default = router;
