import amqp from 'amqplib';
import { emitDataEvent } from './socket.service';

interface PricesData {
    type: 'apple' | 'android';
    body: [];
}

const prices = {
    apple: [],
    android: []
}

export const handlePrices = (channel: amqp.Channel) => {
    channel.consume('prices', async (msg) => {
        if (msg) {
            try{
                const data: PricesData = JSON.parse(msg.content.toString());
                if(data.type == 'apple'){
                    prices.apple = data.body;
                }

                if(data.type == 'android'){
                    prices.android = data.body;
                }
                await emitDataEvent("priceUpdate", prices);
                channel.ack(msg);
                //console.log('---Final Prices:', prices)
            } catch (error){
                console.error('Error - [Request prices]:', error);
                // channel.ack(msg);
            };
        };
    });
};