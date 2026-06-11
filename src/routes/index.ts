import express, { Router } from "express";
import adminRouter from "../modules/admin/admin.routes.js";

interface AppRoute {
    path: string;
    handler: Router;
}

const router = express.Router();

const routes: AppRoute[] = [
    { path: "/admin", handler: adminRouter }
];

routes.forEach(route => {
    router.use(route.path, route.handler);
});

export default router;