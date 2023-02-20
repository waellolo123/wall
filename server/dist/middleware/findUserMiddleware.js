"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindUser = void 0;
const FindUser = (req, res, next) => {
    if (!req.user) {
        res.status(404);
        throw new Error("Not authorized, verify token or user please");
    }
    else {
        next();
    }
};
exports.FindUser = FindUser;
