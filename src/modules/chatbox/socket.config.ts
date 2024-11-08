// src/config/socket.config.ts

import { IoAdapter } from '@nestjs/platform-socket.io';
import { INestApplication } from '@nestjs/common';
import { ServerOptions } from 'socket.io';

export class SocketIoAdapter extends IoAdapter {
  createIOServer(port: number, options?: ServerOptions) {
    const server = super.createIOServer(port, options);
    return server;
  }
}

export function configureSocket(app: INestApplication) {
  app.useWebSocketAdapter(new SocketIoAdapter(app));
}
