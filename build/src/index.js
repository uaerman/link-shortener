"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./database/db"));
db_1.default.connect();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.get('/', async (req, res) => {
    try {
        const result = await db_1.default.query('SELECT * FROM visits');
        res.json(result.rows);
    }
    catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
async function test() {
    console.log('sa');
    try {
        const result = await db_1.default.query('SELECT * FROM visits');
        console.log(result.rows);
    }
    catch (e) {
        console.error('Error executing query:', e);
    }
}
test();
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map