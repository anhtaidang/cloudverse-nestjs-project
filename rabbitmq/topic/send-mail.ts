import amqplib from 'amqplib';
import dotenv from 'dotenv';

const sendTopic = async () => {
  try {
    dotenv.config();

    console.log('Connect to::', process.env.RABBITMQ_URL_DOCKER);
    // 1. Create connect
    const conn = await amqplib.connect(process.env.RABBITMQ_URL_DOCKER ?? '');

    // 2. Create channel
    const channel = await conn.createChannel();

    // 3. Create exchange
    const nameExchange = 'send_email';

    await channel.assertExchange(nameExchange, 'topic', {
      durable: false, // True:::  When restart Queue do not lose message
    });

    const args = process.argv.slice(2);
    const msg = args[1] || 'Need Fixed!';
    const topic = args[0];

    console.log(`MSG::${msg}::::TOPIC::${topic}`);

    // 4. Puslish email
    await channel.publish(nameExchange, topic, Buffer.from(msg)); // RoutingKey = '' => Send to anything Queue avaible

    console.log(`[x] Send Ok::::${msg}`);

    setTimeout(() => {
      console.log('Close Connect:::');
      conn.close();
      process.exit(0);
    }, 2000);
  } catch (err) {
    console.log(err.message);
  }
};

const msg = process.argv.slice(2).join(' ') || 'Hello exchange';

sendTopic();
