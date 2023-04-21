import { Message, OpenAIModel, OpenAIModelNames, Conversation } from "@/types";
import { FC, useEffect, useRef } from "react";
import { ModelSelect } from "../ModelSelect";
import { ChatInput } from "./ChatInput";
import { ChatLoader } from "./ChatLoader";
import { ChatMessage } from "./ChatMessage";

interface Props {
  model: OpenAIModel;
  conversation: Conversation;
  lightMode: "light" | "dark";
  onModelChange: (model: OpenAIModel) => void;
  messages: Message[];
  loading: boolean;
  onSend: (message: Message) => void;
  onSelect: (model: OpenAIModel) => void;
}


export const Chat: FC<Props> = ({ model, messages, lightMode, loading, onSend, onSelect }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col w-full h-full p-4">
      {messages?.length === 0 ? (
        <>
          <div className="flex justify-center pt-8">
            <ModelSelect
              model={model}
              onSelect={onSelect}
            />
          </div>

          <div className="flex-1 text-4xl text-center text-neutral-300 pt-[100px]">satGPT</div>
        </>
      ) : (
        <>
          <div className="flex-1 overflow-auto flex-grow">
            <div className="text-center py-3 dark:bg-black dark:text-white text-neutral-500 text-sm border border-b-neutral-300 dark:border-none">AI: {OpenAIModelNames[model]}</div>

            {messages?.map((message, index) => (
              <div key={index}>
                <ChatMessage message={message} lightMode={lightMode} />
              </div>
            ))}
            {loading && <ChatLoader />}
            <div ref={messagesEndRef} />
          </div>
        </>
      )}

      <div className="flex-shrink-0 mx-auto w-full max-w-[800px]">
        <ChatInput onSend={onSend} />
      </div>
    </div>
  );
};
