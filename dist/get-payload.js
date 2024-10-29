"use strict";
"use server";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPayloadClient = void 0;
const payload_1 = __importDefault(require("payload"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({
    path: path_1.default.resolve(__dirname, ".env"),
});
let cached = global.payload;
if (!cached) {
    cached = global.payload = {
        client: null,
        promise: null,
    };
}
const getPayloadClient = async ({ initOptions, } = {}) => {
    if (!process.env.PAYLOAD_SECRET) {
        throw new Error("PAYLOAD_SECRET is missing");
    }
    if (cached.client) {
        return cached.client;
    }
    if (!cached.promise) {
        cached.promise = payload_1.default.init(Object.assign({ secret: process.env.PAYLOAD_SECRET, local: (initOptions === null || initOptions === void 0 ? void 0 : initOptions.express) ? false : true }, (initOptions || {})));
    }
    try {
        cached.client = await cached.promise;
    }
    catch (e) {
        console.error("Error initializing Payload client:", e);
        cached.promise = null;
        throw e;
    }
    return cached.client;
};
exports.getPayloadClient = getPayloadClient;
