import cors from "cors";
import express, { Application, Request, Response } from "express";
import cookieParser from "cookie-parser";
import notFound from "./middlewares/notFound";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import router from "./routes";
import expressSession from "express-session";
import passport from "passport";
import config from "./config";
import "./../app/config/passport";
const app: Application = express();

app.use(
  expressSession({
    secret: config.EXPRESS_SESSION as string,
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(passport.initialize());
app.use(passport.session());

//parsers
app.use(express.json());
app.use(cookieParser());
app.set("trust proxy", 1);
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "http://localhost:3001",
      "https://cartx.com.bd",
      "https://www.cartx.com.bd",
      "https://admin.cartx.com.bd",
      "https://www.admin.cartx.com.bd",
      "https://mega-mart.store",
      "https://www.mega-mart.store",
      "https://admin.mega-mart.store",
      "https://apps.mega-mart.store",
    ],
    credentials: true,
  }),
);

//app routes
app.use("/api/v1", router);

//root route
app.get("/", (req: Request, res: Response) => {
  res.send("MegaMart server boosted on....🔥🔥🚀");
});

// //global error handler
app.use(globalErrorHandler);

// //not found route
app.use(notFound);

export default app;
