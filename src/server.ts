import express from 'express';
import setupRoute from './routers';
import logger from './core/middlewares/logger';
import { responseMiddleWare } from './core/middlewares/response';
import { errorHandler, jsonParserErrorHandler } from './core/middlewares/error';

const app = express();

// Response Middleware is here even though its RESPONSE
// because we want to change the object of the response so we can wrap the response with our own response object
app.use(responseMiddleWare);

app.use(express.json());
app.use(jsonParserErrorHandler);
app.use(logger.requestLogger);

setupRoute(app);

app.use(errorHandler);

app.listen(3000, () => {});
