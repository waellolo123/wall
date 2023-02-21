"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const errorHandler_1 = require("./middleware/errorHandler");
const users_router_1 = __importDefault(require("./routes/users.router"));
const images_router_1 = __importDefault(require("./routes/images.router"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
dotenv_1.default.config();
/* cors for cross origin */
/* const allowedOrigins = ["http://localhost:3000", "http://walltribute.com"];
app.use(
  cors({
    origin(origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
); */
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use("/images", express_1.default.static("public/images"));
/* Connect to DB */
const MONGO_URI = process.env.MONGO_URI;
const retryStart = () => {
    mongoose_1.default
        .connect(MONGO_URI)
        .then(() => console.log("⚡️[database]: Database is running now"))
        .catch((err) => {
        console.log(err);
        setTimeout(() => {
            retryStart();
        }, 5000);
    });
};
retryStart();
app.enable("trust proxy");
app.use("/api", [users_router_1.default, images_router_1.default]);
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
/* Error handler */
app.use(errorHandler_1.notFound);
app.use(errorHandler_1.errorHandler);
exports.default = app;
