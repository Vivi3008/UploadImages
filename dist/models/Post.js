"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const ts_dotenv_1 = require("ts-dotenv");
const dotenv = __importStar(require("dotenv"));
const path_1 = __importDefault(require("path"));
const util_1 = require("util");
const fs_1 = __importDefault(require("fs"));
dotenv.config();
const env = ts_dotenv_1.load({
    STORAGE_TYPE: String,
    APP_URL: String
});
const s3 = new aws_sdk_1.default.S3();
const PostSchema = new mongoose_1.default.Schema({
    name: String,
    size: Number,
    key: String,
    url: String,
    createdAt: {
        type: Date,
        default: Date.now,
    }
});
PostSchema.pre('save', function () {
    if (!this.url) {
        this.url = `${env.APP_URL}/files/${this.key}`;
    }
});
PostSchema.pre('remove', function () {
    let params = { Bucket: 'uploadexample2', Key: `${this.key}` };
    if (env.STORAGE_TYPE === 's3') {
        return s3.deleteObject(params, function (err, data) {
            if (err)
                console.log("Erro ao deletar objeto", err);
            console.log(data);
        }).promise();
    }
    else {
        return util_1.promisify(fs_1.default.unlink)(path_1.default.resolve(__dirname, '..', '..', 'tmp', 'uploads', this.key));
    }
});
exports.default = mongoose_1.default.model("Post", PostSchema);
// mongoose.model("Post", PostSchema) 
