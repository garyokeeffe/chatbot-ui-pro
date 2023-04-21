import { Message } from "@/types";
import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  message: Message;
  lightMode: "light" | "dark";
}
const handleFeedback = async (messageIndex: number, feedback: 'good' | 'bad') => {
  const updatedConversation = { ...conversation };
  updatedConversation.messages[messageIndex].feedback = feedback;

  // Update the conversation state and localStorage
  onSelect(updatedConversation);

  try {
    const response = await fetch('/api/report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        conversationId: updatedConversation.id,
        messageIndex,
        feedback,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.error('Failed to send feedback:', error);
  }
};

export const ChatMessage: FC<Props> = ({ message, lightMode }) => {
  const isAssistant = message.role === "assistant";
  const bgColor = isAssistant
    ? lightMode === "light" ? "bg-neutral-100" : "bg-black"
    : lightMode === "light" ? "bg-white" : "bg-black";
  const textColor = isAssistant
    ? lightMode === "light" ? "text-orange-500" : "text-orange-400"
    : lightMode === "light" ? "text-neutral-900" : "text-white";
  const borderColor = isAssistant && lightMode === "light" ? "border border-neutral-300" : "dark:border-none";

  return (
    <div
      className={`flex justify-center px-[30px] py-[30px] whitespace-pre-wrap ${bgColor} ${textColor} ${borderColor}`}
      style={{ overflowWrap: "anywhere" }}
    >
      <div className="w-[650px] flex">
        <div className="mr-4 font-bold min-w-[40px]">{isAssistant ? "AI:" : "You:"}</div>

        <div className="whitespace-pre-wrap">{message.content}</div>
        {message.role === 'assistant' && (
        <div className="flex items-center">
          <FontAwesomeIcon
            icon={faThumbsUp}
            className="mx-1 text-green-500 cursor-pointer"
            onClick={() => handleFeedback(index, 'good')}
          />
          <FontAwesomeIcon
            icon={faThumbsDown}
            className="mx-1 text-red-500 cursor-pointer"
            onClick={() => handleFeedback(index, 'bad')}
          />
        </div>
      )}
      </div>
    </div>
  );
};
