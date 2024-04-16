"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
const express_1 = __importDefault(require("express"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const restaurant_route_1 = __importDefault(require("./routes/restaurant.route"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
app.use('/users', user_route_1.default);
app.use('/restros', restaurant_route_1.default);
app.listen(PORT, () => {
    console.log('Running on port', PORT);
});
exports.default = app;
//# sourceMappingURL=index.js.map