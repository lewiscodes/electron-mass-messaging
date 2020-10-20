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
    socket.on('disconnect', () => {
        console.log('disconnected');
    });
});

server.listen(5000, () => {
    console.log(`Server listening on port 5000 over HTTP.`);
});