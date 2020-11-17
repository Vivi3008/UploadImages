"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes = express_1.default.Router();
routes.get('/', (req, res) => {
    res.json({
        "Nome do projeto": "Upload de imagens",
        "Status": "Não sei se vai dar certo"
    });
});
exports.default = routes;
