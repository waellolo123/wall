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
exports.Payment = exports.GetImageByUser = exports.Delete = exports.List = exports.Add = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const stripe_1 = __importDefault(require("stripe"));
const images_model_1 = __importDefault(require("../../models/images.model"));
const upload_1 = __importDefault(require("../../util/upload"));
const Image_validation_1 = __importDefault(require("../../validations/Image.validation"));
// ######################### Add image #########################/;
function Add(req, res) {
    (0, upload_1.default)(req, res, (err) => __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        const { errors, isValid } = (0, Image_validation_1.default)(req);
        if (err) {
            errors.file = err.message;
            return res.status(404).json(errors);
        }
        else {
            if (!isValid) {
                return res.status(404).json(errors);
            }
            else {
                const image = {
                    user: (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id,
                    title: req.body.title,
                    description: req.body.description,
                    position: req.body.position,
                    image: path_1.default.join(`/static/${(_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b._id}/${(_c = req === null || req === void 0 ? void 0 : req.file) === null || _c === void 0 ? void 0 : _c.filename}`),
                };
                yield images_model_1.default.create(image);
                res.status(200).json({
                    message: "Image added with success",
                });
            }
        }
    }));
}
exports.Add = Add;
// ######################### List of all images #########################/;
function List(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        yield images_model_1.default
            .find()
            .populate("user", "-password")
            .then((result) => {
            res.status(200).json(result);
        });
    });
}
exports.List = List;
// ######################### Delete image by Id #########################/;
function Delete(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const homeDir = path_1.default
            .resolve(__dirname)
            .replace("/dist/controllers/users", "");
        const ImageDir = path_1.default.join(homeDir, "public", "images");
        yield images_model_1.default
            .findOne({ _id: req === null || req === void 0 ? void 0 : req.params.id_image })
            .populate("user", "-password")
            .then((result) => __awaiter(this, void 0, void 0, function* () {
            if (result) {
                const pathImage = `${path_1.default.join(ImageDir, result.image.replace("/static", ""))}`;
                fs_1.default.unlink(pathImage, (err) => __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        return res.status(500).json({
                            message: "Problem into delete image file, this action cant' be completed",
                        });
                    }
                    yield images_model_1.default.deleteOne({ _id: req.params.id_image });
                    res.status(200).json({ message: "Image deleted with success" });
                }));
            }
            else {
                res.status(404).json({ message: "Image not found" });
            }
        }));
    });
}
exports.Delete = Delete;
// ######################### Get image by Id #########################/;
function GetImageByUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        yield images_model_1.default
            .find({ user: req === null || req === void 0 ? void 0 : req.params.id_user })
            .populate("user", "-password")
            .then((result) => {
            res.status(200).json(result);
        });
    });
}
exports.GetImageByUser = GetImageByUser;
// ######################### Payment #########################/;
function Payment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const stripe = new stripe_1.default(process.env.STRIPE_SECRET, {
            apiVersion: "2022-11-15",
        });
        try {
            const session = yield stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                mode: "payment",
                line_items: [
                    {
                        price_data: {
                            currency: "usd",
                            product_data: {
                                name: "image",
                                description: req.body.description,
                                images: [
                                    "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
                                ],
                            },
                            unit_amount: 100,
                        },
                        quantity: 1,
                    },
                ],
                success_url: "http://localhost:3000?status=success?session_id={CHECKOUT_SESSION_ID}",
                cancel_url: "http://localhost:3000?status=error",
                metadata: {
                    file_name: "example.jpg",
                    file_url: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
                    file_id: "123456789",
                    email: "mansouriyoussef1991@gmail.com",
                },
            });
            res.status(200).send({ url: session.url, id: session.id });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    });
}
exports.Payment = Payment;
