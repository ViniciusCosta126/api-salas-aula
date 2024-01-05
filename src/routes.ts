import { Router } from "express";
import { SubjectController } from "./controllers/SubjectController";
import { RoomController } from "./controllers/RoomController";

const routes = Router();

routes.post("/subject", new SubjectController().create);
routes.post("/room", new RoomController().create);
routes.post("/room/:idRoom/create", new RoomController().createVideo);

export default routes;
