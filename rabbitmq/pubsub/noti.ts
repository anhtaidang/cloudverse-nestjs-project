import amqplib from 'amqplib';
import dotenv from 'dotenv';

const receiveNoti = async () => {
  try {
    dotenv.config();

    console.log('Connect to::', process.env.RABBITMQ_URL_DOCKER);
    // 1. Create connect
    const conn = await amqplib.connect(process.env.RABBITMQ_URL_DOCKER ?? '');

    // 2. Create channel
    const channel = await conn.createChannel();

    // 3. Create exchange
    const nameExchange = 'video';

    await channel.assertExchange(nameExchange, 'fanout', {
      durable: false, // True:::  When restart Queue do not lose message
    });

    // 4. Create queue
    const {
      queue, // name queue
    } = await channel.assertQueue('', {
      exclusive: true, // Auto remove queue
    });

    console.log(`Name Queue:::: ${queue}`);

    // 5. Binding
    await channel.bindQueue(queue, nameExchange, '');

    await channel.consume(
      queue,
      (msg) => {
        console.log('MSG:::: ', msg?.content.toString());
      },
      {
        noAck: true, // Confirm REVEICED
      },
    );
  } catch (err) {
    console.log(err.message);
  }
};

receiveNoti();
