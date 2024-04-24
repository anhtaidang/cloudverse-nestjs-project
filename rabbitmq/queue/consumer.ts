import amqplib from 'amqplib';
import dotenv from 'dotenv';

async function receiveQueue() {
  try {
    dotenv.config();

    console.log('Connect to::', process.env.RABBITMQ_URL_DOCKER);
    // 1. Create connect
    const conn = await amqplib.connect(process.env.RABBITMQ_URL_DOCKER ?? '');
    // 2. Create channel
    const channel = await conn.createChannel();
    // 3. Create queue
    const nameQueue = 'q1';

    await channel.assertQueue(nameQueue, { durable: false });

    // 4. Receive to queue
    await channel.consume(
      nameQueue,
      (msg) => {
        console.log('MSG:::: ', msg?.content.toString());
      },
      {
        noAck: true, // Confirm REVEICED
      },
    );

    // 5. Close conn and channel
  } catch (error) {
    console.log('Error:: ', JSON.stringify(error));
  }
}

receiveQueue();
