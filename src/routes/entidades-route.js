"use strict";

import express from 'express';
const router = express.Router();

import { criar, listar, editar, deletar} from "../controllers/entidades-controller.js";
import { authorize } from "../services/auth-service.js";


router.post("", authorize, criar);

router.get("", authorize, listar);

router.put("/:id", authorize, editar);

router.delete("/:id", authorize, deletar);

export default router;
