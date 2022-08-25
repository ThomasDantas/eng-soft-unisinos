"use strict";

import express from 'express';
const router = express.Router();

import { criar, login, editar, deletar} from "../controllers/usuario-controller.js";
import { authorize } from "../services/auth-service.js";


router.post("", criar);

router.post("/login", login);

router.put("", authorize, editar);

router.delete("", authorize, deletar);

export default router;
