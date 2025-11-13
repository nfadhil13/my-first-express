import express from 'express';
import setupRoute from './routers';

const app = express();

app.use(express.json());

setupRoute(app);

app.listen(3000, () => {});
