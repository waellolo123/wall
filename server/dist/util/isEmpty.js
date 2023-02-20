"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isEmpty = (value) => value === null ||
    value === undefined ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0);
exports.default = isEmpty;
