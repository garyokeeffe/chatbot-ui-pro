import { Message, OpenAIModel } from "@/types";
import { OpenAIStream } from "@/utils";

export const config = {
  runtime: "edge"
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const { model, messages } = (await req.json()) as {
      model: OpenAIModel;
      messages: Message[];
    };

    if (!model || !messages || !Array.isArray(messages)) {
      return new Response("Invalid Request Body", { status: 400 });
    }

    const charLimit = 12000;
    let charCount = 0;
    let messagesToSend = [];

    for (let i = 0; i < messages.length; i++) {
      const message = messages[i];
      if (charCount + message.content.length > charLimit) {
        break;
      }
      charCount += message.content.length;
      messagesToSend.push(message);
    }

    const stream = await OpenAIStream(model, messagesToSend);

    return new Response(stream);
  } catch (error) {
      if (error instanceof Error) {
        console.error("Error:", error.message);
      } else {
        console.error("Error:", error);
      }
      return new Response("Internal Server Error", { status: 500 });
    }
    
  }
};

export default handler;
