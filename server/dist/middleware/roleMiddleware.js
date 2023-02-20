"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROLES = exports.inRole = void 0;
const ROLES = {
    ADMIN: "1",
    USER: "2",
    DEVELOER: "3",
};
exports.ROLES = ROLES;
const inRole = (...roles) => (req, res, next) => {
    const role = roles.find((r) => req.user.roles.indexOf(r) !== -1);
    if (!role) {
        return res.status(401).json({ message: "No Access to this page" });
    }
    next();
};
exports.inRole = inRole;
