import amqplib from 'amqplib';
import dotenv from 'dotenv';

const receiverTopic = async () => {
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

    // 4. Create queue
    const {
      queue, // name queue
    } = await channel.assertQueue('', {
      exclusive: true, // Auto remove queue
    });

    console.log(`Name Queue:::: ${queue}`);

    // 5. Binding

    const args = process.argv.slice(2);

    if (!args.length) {
      process.exit();
    }

    /*
        * Có nghĩa phù hợp với bất kỳ ký tự nào.
        # Khớp với một hoặc nhiều từ bất kỳ.
    */

    console.log(`Waitting queue ${queue} with TOPIC::${args}`);

    args.forEach(async (key) => {
      console.log(`KEY::${key}`);
      await channel.bindQueue(queue, nameExchange, key);
    });

    await channel.consume(queue, (msg: any) => {
      console.log(
        `Routing key:${
          msg.fields.routingKey
        }::::${msg}::${msg.content.toString()}`,
      );
    });
  } catch (err) {
    console.log(err.message);
  }
};

receiverTopic();
