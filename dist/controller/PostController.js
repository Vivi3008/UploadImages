"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Post_1 = __importDefault(require("../models/Post"));
exports.default = {
    async InsertPost(req, res) {
        const { originalname: name, size, key, location: url = '' } = req.file;
        const post = await Post_1.default.create({
            name,
            size,
            key,
            url,
        });
        return res.json(post);
    },
    async ListPost(req, res) {
        const posts = await Post_1.default.find();
        res.json(posts);
    },
    async DeletePost(req, res) {
        const post = await Post_1.default.findById(req.params.id);
        await (post === null || post === void 0 ? void 0 : post.remove());
        return res.send('Deletado com sucesso!');
    }
};
