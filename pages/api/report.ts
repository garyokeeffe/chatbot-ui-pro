import { NextApiRequest, NextApiResponse } from 'next';
import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

AWS.config.update({
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
    region: process.env.NEXT_PUBLIC_AWS_REGION,
});
  
const s3 = new AWS.S3();
  
const logFeedback = async (conversationId: string, messageIndex: number, feedback: 'good' | 'bad') => {
    const feedbackId = uuidv4();
    const feedbackData = {
      conversationId,
      messageIndex,
      feedback,
    };
  
    const putObjectParams = {
      Bucket: process.env.NEXT_PUBLIC_S3_FEEDBACK_BUCKET_NAME || 'chat-btc-feedback',
      Key: `${feedbackId}.json`,
      Body: JSON.stringify(feedbackData),
    };
  
    await s3.putObject(putObjectParams).promise();
  };
  

  export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
      const { conversationId, messageIndex, feedback } = req.body;
  
      try {
        await logFeedback(conversationId, messageIndex, feedback);
        res.status(200).json({ status: 'success', message: 'Feedback received' });
      } catch (error) {
        console.error('Failed to save feedback:', error);
        res.status(500).json({ status: 'error', message: 'Failed to save feedback' });
      }
      else {
        res.setHeader('Allow', 'POST');
        res.status(405).json({ status: 'error', message: 'Method Not Allowed' });
      }
      
  };
  
