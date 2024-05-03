import amqplib from 'amqplib';
import dotenv from 'dotenv';

const postVideo = async ({ msg }: { msg: string }) => {
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

    // 4. Puslish video
    await channel.publish(nameExchange, '', Buffer.from(msg)); // RoutingKey = '' => Send to anything Queue avaible

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

postVideo({ msg });
