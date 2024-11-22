import amqp from 'amqplib';
import { handlePrices } from '../../event/services/messageHandler.service';


let connection: amqp.Connection | null = null;
let channel: amqp.Channel | null = null;

export async function connectMessageServer() {
  try {
    connection = await amqp.connect('amqp://localhost');
    channel = await connection.createChannel();

    handlePrices(channel);
    
    console.log('Connected to RabbitMQ');
  } catch (error) {
    console.error('Error on connecting to RabbitMQ:', error);
  };
};

export async function sendMessage(queue: string, message: object) {
  if (!channel) {
    console.error('RabbitMQ channel not initialized');
    return;
  };

  await channel.assertQueue(queue, { durable: true });
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
  console.log(`Message sent to queue ${queue}:`, message);
};

export async function closeConnection() {
  await channel?.close();
  await connection?.close();
}
