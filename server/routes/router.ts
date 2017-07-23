import { Request, Response, Router } from "express";
import { environmentRouter, projectRouter, userRouter } from "./identity/identity.router";
import { schemaRouter, dataRouter } from "./cms/cms.router";

const apiRouter = (): Router => {
    const router: Router = Router();

    router.use("/identity/user", userRouter());
    router.use("/identity/project", projectRouter());
    router.use("/identity/environment", environmentRouter());
    router.use("/cms/schema", schemaRouter());
    router.use("/cms/data", dataRouter());

    return router;
};

export { apiRouter };
