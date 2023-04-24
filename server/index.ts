import express from 'express';
import expressWs from 'express-ws';
import { config } from 'dotenv';
import cors from 'cors';
import fs from 'fs';

import IMessage from 'interfaces/IMessage';

config();
const PORT = process.env.PORT || 5000;
const { app, getWss } = expressWs(express());
const aWss = getWss();

app.use(cors());
app.use(express.json());

app.ws('/', (ws, req) => {
  console.log('Подключение установлено');

  ws.on('message', (msg: string) => {
    const message: IMessage = JSON.parse(msg);
    console.log(msg);

    switch (message.method) {
      case 'connection':
        connectionHandler(ws, message);
        break;

      case 'draw':
        broadCastConnection(ws, message);
        break;
    }
  });
});

app.post('/image', (req, res) => {
  try {
    const data = req.body.img.replace('data:image/png;base64,', '');
    fs.writeFileSync(`${__dirname}/files/${req.query.id}.jpg`, data, 'base64');

    return res.status(200).json({ message: 'Загружено' });
  } catch (err) {
    console.log(err);
    return res.status(500).json('error something has gone wrong');
  }
});

app.get('/image', (req, res) => {
  try {
    const file = fs.readFileSync(`${__dirname}/files/${req.query.id}.jpg`);
    const data = 'data:image/png;base64,' + file.toString("base64");
    return res.json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).json('error something has gone wrong');
  }
});

const connectionHandler = (ws: any, msg: IMessage) => {
  ws.id = msg.id;
  broadCastConnection(ws, msg);
};

const broadCastConnection = (ws: any, msg: IMessage) => {
  aWss.clients.forEach((client: any) => {
    if (client.id === msg.id) {
      client.send(JSON.stringify(msg));
    }
  });
};

app.listen(PORT, () => console.log(`Server listen on PORT ${PORT}`));
