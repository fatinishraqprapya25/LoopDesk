import express, { Router } from "express";
import adminRouter from "../modules/admin/admin.routes.js";
import { toNodeHandler } from "better-auth/node";
import { auth } from "../config/auth.js";

interface AppRoute {
    path: string;
    handler: Router;
}

const router = express.Router();

const routes: AppRoute[] = [
    { path: "/admin", handler: adminRouter },
    { path: "/auth/*", handler: toNodeHandler(auth) as any }
];

routes.forEach(route => {
    router.use(route.path, route.handler);
});

export default router;