import amqplib from 'amqplib';
import dotenv from 'dotenv';

async function sendQueue({ msg }: { msg: string }) {
  try {
    dotenv.config();

    console.log('Connect to::', process.env.RABBITMQ_URL_DOCKER);
    // 1. Create connect
    const conn = await amqplib.connect(process.env.RABBITMQ_URL_DOCKER ?? '');

    // 2. Create channel
    const channel = await conn.createChannel();

    // 3. Create queue
    const nameQueue = 'q1';

    await channel.assertQueue(nameQueue, {
      durable: true, // => True:::  When restart Queue do not lose message
    });

    // 4. Send to queue
    await channel.sendToQueue(nameQueue, Buffer.from(msg), {
      expiration: '10000', // => TTL time to live (in 10 second have not process will expire)
      persistent: true, // => Storge Cache or Storega
    });

    // 5. Close conn and channel
  } catch (error) {
    console.log('Error:: ', JSON.stringify(error));
  }
}

const msg = process.argv.slice(2).join(' ') || 'Hello';

sendQueue({ msg });
