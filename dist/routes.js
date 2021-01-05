"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const multer_2 = __importDefault(require("./config/multer"));
const PostController_1 = __importDefault(require("./controller/PostController"));
const routes = express_1.default.Router();
routes.post('/posts', multer_1.default(multer_2.default).single('file'), PostController_1.default.InsertPost);
routes.get('/posts', PostController_1.default.ListPost);
routes.delete('/posts/:id', PostController_1.default.DeletePost);
exports.default = routes;
