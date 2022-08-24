"use strict";

import { Router } from "express";
const router = Router();

import { criar, editar } from "../controllers/usuario-controller.js";
import { authorize } from "../services/auth-service";


router.post(
  "/",
  criar
);

router.put(
  "/",
  authorize,
  editar
);

export default router;
