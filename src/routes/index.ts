import express, { Router } from "express";
import adminRouter from "../modules/admin/admin.routes.js";
import { toNodeHandler } from "better-auth/node";
import { auth } from "../config/auth.js";

interface AppRoute {
    path: string;
    handler: Router;
}

const router = express.Router();
router.use("/auth/*splat", toNodeHandler(auth));

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const routes: AppRoute[] = [
    { path: "/admin", handler: adminRouter }
];

routes.forEach(route => {
    router.use(route.path, route.handler);
});

export default router;