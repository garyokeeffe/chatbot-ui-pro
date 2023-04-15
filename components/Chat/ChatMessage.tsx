import { Message } from "@/types";
import { FC } from "react";

interface Props {
  message: Message;
  lightMode: "light" | "dark";
}

export const ChatMessage: FC<Props> = ({ message, lightMode }) => {
  const isAssistant = message.role === "assistant";
  const bgColor = isAssistant
    ? lightMode === "light" ? "bg-neutral-100" : "dark:bg-orange"
    : lightMode === "light" ? "dark:bg-black" : "";
  const textColor = isAssistant ? "text-neutral-900" : "dark:text-orange";
  const borderColor = isAssistant && lightMode === "light" ? "border border-neutral-300" : "dark:border-none";

  return (
    <div
      className={`flex justify-center px-[120px] py-[30px] whitespace-pre-wrap] ${bgColor} ${textColor} ${borderColor}`}
      style={{ overflowWrap: "anywhere" }}
    >
      <div className="w-[650px] flex">
        <div className="mr-4 font-bold min-w-[40px]">{isAssistant ? "ChatBTC:" : "You:"}</div>

        <div className="whitespace-pre-wrap">{message.content}</div>
      </div>
    </div>
  );
};
