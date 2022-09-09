"use strict";

import express from 'express';
const router = express.Router();

import { criar, login, editar, deletar, entidades} from "../controllers/usuario-controller.js";
import { authorize } from "../services/auth-service.js";

router.post("/login", login);

router.post("", criar);

router.put("", authorize, editar);

router.delete("", authorize, deletar);

router.get("/entidades-sociais", authorize, entidades);

export default router;
