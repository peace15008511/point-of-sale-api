"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchExampleData = void 0;
function fetchExampleData() {
    return __awaiter(this, void 0, void 0, function* () {
        // Example logic to fetch data from a database or external service
        const data = [
            { id: 1, name: "Example 1" },
            { id: 2, name: "Example 2" },
        ];
        return data;
    });
}
exports.fetchExampleData = fetchExampleData;
