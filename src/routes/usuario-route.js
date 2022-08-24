"use strict";

import express from 'express';
const router = express.Router();

import { criar, editar } from "../controllers/usuario-controller.js";
import { authorize } from "../services/auth-service.js";


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
