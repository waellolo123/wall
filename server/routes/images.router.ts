import express, { Request, Response } from "express";
import Stripe from "stripe";
import {
  Add,
  Delete,
  GetImageByUser,
  List,
  Payment,
} from "../controllers/users/images.controller";
import PROTECT from "../middleware/authMiddleware";
import { FindUser } from "../middleware/findUserMiddleware";
import { inRole, ROLES } from "../middleware/roleMiddleware";
const router = express.Router();

/*
 * Method("POST")
 * Private
 */
router.post(
  "/uploads",
  PROTECT,
  FindUser,
  inRole(ROLES.USER, ROLES.DEVELOER),
  Add
);

/*
 * Method("GET")
 * Private
 */
router.get("/images", PROTECT, FindUser, List);

/*
 * Method("GET")
 * Param(":id_image")
 * Private
 */
router.get("/images/:id_user", PROTECT, FindUser, GetImageByUser);

/*
 * Method("DELETE")
 * Param(":id_image")
 * Private
 */
router.delete(
  "/images/:id_image",
  PROTECT,
  FindUser,
  inRole(ROLES.USER, ROLES.ADMIN, ROLES.DEVELOER),
  Delete
);

/*
 * Method("DELETE")
 * Param(":id_image")
 * Private
 */
router.post("/images/payment", PROTECT, FindUser, Payment);

const stripe = new Stripe(process.env.STRIPE_SECRET!, {
  apiVersion: "2022-11-15",
});

const endpointSecret =
  "whsec_ba36f39f71dc78a71e9196ef339ecc77165fee172a683500fced0d5ef1819be0";

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (req: Request, res: Response) => {
    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig!, endpointSecret);
    } catch (err) {
      return console.log(err);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      // Save the payment data and form data to your database
    }

    res.json({ received: true });
  }
);

export default router;
