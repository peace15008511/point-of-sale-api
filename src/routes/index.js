"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const exampleRoute_1 = __importDefault(require("./exampleRoute"));
function routes(fastify, options, done) {
    fastify.register(exampleRoute_1.default, { prefix: "/example" });
    // Add more routes here if needed
    done();
}
exports.default = routes;
