"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const stripe_1 = __importDefault(require("stripe"));
const images_controller_1 = require("../controllers/users/images.controller");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const findUserMiddleware_1 = require("../middleware/findUserMiddleware");
const roleMiddleware_1 = require("../middleware/roleMiddleware");
const router = express_1.default.Router();
/*
 * Method("POST")
 * Private
 */
router.post("/uploads", authMiddleware_1.default, findUserMiddleware_1.FindUser, (0, roleMiddleware_1.inRole)(roleMiddleware_1.ROLES.USER, roleMiddleware_1.ROLES.DEVELOER), images_controller_1.Add);
/*
 * Method("GET")
 * Private
 */
router.get("/images", authMiddleware_1.default, findUserMiddleware_1.FindUser, images_controller_1.List);
/*
 * Method("GET")
 * Param(":id_image")
 * Private
 */
router.get("/images/:id_user", authMiddleware_1.default, findUserMiddleware_1.FindUser, images_controller_1.GetImageByUser);
/*
 * Method("DELETE")
 * Param(":id_image")
 * Private
 */
router.delete("/images/:id_image", authMiddleware_1.default, findUserMiddleware_1.FindUser, (0, roleMiddleware_1.inRole)(roleMiddleware_1.ROLES.USER, roleMiddleware_1.ROLES.ADMIN, roleMiddleware_1.ROLES.DEVELOER), images_controller_1.Delete);
/*
 * Method("DELETE")
 * Param(":id_image")
 * Private
 */
router.post("/images/payment", authMiddleware_1.default, findUserMiddleware_1.FindUser, images_controller_1.Payment);
const stripe = new stripe_1.default(process.env.STRIPE_SECRET, {
    apiVersion: "2022-11-15",
});
const endpointSecret = "whsec_ba36f39f71dc78a71e9196ef339ecc77165fee172a683500fced0d5ef1819be0";
router.post("/webhook", express_1.default.raw({ type: "application/json" }), (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    }
    catch (err) {
        return console.log(err);
    }
    if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        // Save the payment data and form data to your database
    }
    res.json({ received: true });
});
exports.default = router;
