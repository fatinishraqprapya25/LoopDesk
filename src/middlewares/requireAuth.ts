import { Request, Response, NextFunction } from "express";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../config/auth.js";
import { sendResponse } from "../utils/sendResponse.js";

export interface AuthenticatedRequest extends Request {
    user?: typeof auth.$Infer.Session.user;
    session?: typeof auth.$Infer.Session.session;
}

export const requireAuth = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const session = await auth.api.getSession({
            headers: fromNodeHeaders(req.headers),
        });

        if (!session) {
            sendResponse(res, 401, {
                message: "Unauthorized access"
            });
            return;
        }

        req.user = session.user;
        req.session = session.session;

        next();
    } catch (error) {
        next(error);
    }
};