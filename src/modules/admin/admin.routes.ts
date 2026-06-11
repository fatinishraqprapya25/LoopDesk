import express from "express";
import adminContollers from "./admin.controller.js";

const adminRouter = express.Router();

adminRouter.get("/check-health", adminContollers.checkHealth);

export default adminRouter;