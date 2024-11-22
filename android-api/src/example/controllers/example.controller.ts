import { Request, Response } from 'express'
import { sendMessage } from '../../shared/services/messagin.service';

export const testPostExample = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    await sendMessage('prices', body);
    return res.status(200).send('Message Sended Correctly');
  } catch (error) {
    console.log('response:', error);
    return res.status(422).send('Error on send message')
  }
}