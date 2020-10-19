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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = __importDefault(require("socket.io"));
const app = express_1.default();
const server = http_1.default.createServer(app);
const io = socket_io_1.default(server);
app.get('/', (_req, res) => {
    res.send('<h1>Hello world</h1>');
});
io.on('connection', (socket) => __awaiter(void 0, void 0, void 0, function* () {
    io.emit('init-resources', generateResources(100));
    socket.on('disconnect', () => {
        console.log('disconnected');
    });
}));
const generateResources = (numberOfResources) => {
    const resources = [];
    for (let x = 0; x < numberOfResources; x++) {
        resources.push({
            id: x,
            cs: generateRandomCs(),
            ct: 'CFT',
            type: generateRandomType(),
            status: generateRandomStatus(),
            location: getRandomCoordinates(),
            travelTime: '',
            eta: '',
            distance: '',
            station: 'Police Station'
        });
    }
    return resources;
};
const generateRandomCs = () => {
    const cs = [];
    for (let x = 0; x < 6; x++) {
        if (getRandomNumber(2) === 1) {
            cs.push(getRandomNumber(9).toString());
        }
        else {
            cs.push(getLetter(getRandomNumber(26)));
        }
    }
    return cs.join();
};
const generateRandomType = () => {
    switch (getRandomNumber(4)) {
        case 1:
            return 'CID';
        case 2:
            return 'RC';
        case 3:
            return 'PCSO';
        case 4:
            return 'COD';
        default:
            return 'CIS';
    }
};
const generateRandomStatus = () => {
    switch (getRandomNumber(4)) {
        case 1:
            return '05';
        case 2:
            return '02';
        case 3:
            return '06';
        default:
            return 'AS';
    }
};
const getRandomNumber = (maxNumber) => {
    return Math.floor(Math.random() * maxNumber);
};
const getRandomDecimalNumber = (maxNumber) => {
    return Math.random() * maxNumber;
};
const getLetter = (letterOfAlphabet) => {
    const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    return alphabet[letterOfAlphabet - 1];
};
const getRandomCoordinates = () => {
    // top-left : -11062.3302079881, 6719826.438613703
    // top-right : 15870.891661879545, 6719811.034488744
    // bottom-right : 15832.617163585379, 6703622.7256046
    // bottom-left : -17248.178584805773, 6703303.85387326
    const minX = -17248.178584805773;
    const maxX = 15870.891661879545;
    const minY = 6703303.85387326;
    const maxY = 6719826.438613703;
    const differenceX = maxX - minX;
    const differenceY = maxY - minY;
    const x = minX + getRandomDecimalNumber(differenceX);
    const y = minY + getRandomDecimalNumber(differenceY);
    return [x, y];
};
server.listen(5000, () => {
    console.log(`Server listening on port 5000 over HTTP.`);
});
