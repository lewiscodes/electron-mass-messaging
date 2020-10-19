import express, { Application, Request, Response } from 'express';
import http from 'http';
import socketIo from 'socket.io';

const app: Application = express();
const server = http.createServer(app);
const io: socketIo.Server = socketIo(server);

app.get('/', (_req: Request, res: Response) => {
    res.send('<h1>Hello world</h1>');
});

io.on('connection', async (socket: socketIo.Socket) => {
    io.emit('init-resources', generateResources(100));

    socket.on('disconnect', () => {
        console.log('disconnected');
    });
});

interface IResource {
    readonly id: number;
    readonly cs: string;
    readonly ct: string;
    readonly type: string;
    readonly status: string;
    readonly location: number[];
    readonly travelTime: string;
    readonly eta: string;
    readonly distance: string;
    readonly station: string;
}

const generateResources = (numberOfResources: number): IResource[] => {
    const resources: IResource[] = [];

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
}

const generateRandomCs = (): string => {
    const cs: string[] = [];
    

    for (let x = 0; x < 6; x++) {
        if (getRandomNumber(2) === 1) {
            cs.push(getRandomNumber(9).toString());
        } else {
            cs.push(getLetter(getRandomNumber(26)));
        }
    }

    return cs.join();
}

const generateRandomType = (): string => {
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
}

const generateRandomStatus = (): string => {
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
}

const getRandomNumber = (maxNumber: number): number => {
    return Math.floor(Math.random() * maxNumber);
}

const getRandomDecimalNumber = (maxNumber: number) => {
    return Math.random() * maxNumber;
}

const getLetter = (letterOfAlphabet: number): string => {
    const alphabet: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    return alphabet[letterOfAlphabet - 1];
};

const getRandomCoordinates = (): number[] => {
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
}

server.listen(5000, () => {
    console.log(`Server listening on port 5000 over HTTP.`);
});