import { Socket } from 'socket.io';
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';

@WebSocketGateway(4001, { namespace: 'chats', cors: { origin: '*' } })
export class ChatsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private clients = new Map<string, string>(); // Map userId to client socketId

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    const userId = client.handshake.query.userId as string; // Pass userId as a query when connecting
    if (userId) {
      this.clients.set(userId.toString(), client.id);
    }
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    this.clients.forEach((socketId, userId) => {
      if (socketId === client.id) {
        this.clients.delete(userId);
      }
    });
  }

  @SubscribeMessage('privateMessage')
  handlePrivateMessage(
    @MessageBody() data: { senderId: string; receiverId: string; message: string },
    @ConnectedSocket() client: Socket,
  ) {
    const { senderId, receiverId, message } = data;
    const receiverSocketId = this.clients.get(receiverId);
    if (receiverSocketId) {
      client.to(receiverSocketId).emit('privateMessage', { senderId, message });
    } else {
      console.log('Receiver not connected');
    }
  }
}
