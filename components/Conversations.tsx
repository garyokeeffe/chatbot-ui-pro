import { Conversation } from "@/types";
import { IconMessage, IconTrash } from "@tabler/icons-react";
import { FC } from "react";

interface Props {
  conversations: Conversation[];
  selectedConversation?: Conversation;
  onSelectConversation: (conversation: Conversation) => void;
  onDeleteConversation: (conversation: Conversation) => void;
  lightMode: "light" | "dark";
}

export const Conversations: FC<Props> = ({
  conversations,
  selectedConversation,
  onSelectConversation,
  onDeleteConversation,
  lightMode,
}) => {
  const themeClass = lightMode === "light" ? "orange-theme" : "black-theme";
  const buttonBgColor = lightMode === "light" ? "bg-orange-500" : "bg-black";
  const buttonBgColorSecondary = lightMode === "light" ? "bg-orange-300" : "bg-gray-400";
  const buttonHoverColor = lightMode === "light" ? "hover:bg-orange-600" : "hover:bg-gray-800";

  return (
    <div className={`flex flex-col space-y-2 ${themeClass}`}>
      {conversations.map((conversation, index) => (
        <div
          key={index}
          className={`flex items-center justify-start w-[240px] h-[40px] px-2 text-sm rounded-lg cursor-pointer ${
            selectedConversation && selectedConversation.id === conversation.id
              ? `${buttonBgColor} border border-neutral-600`
              : `${buttonBgColorSecondary} ${buttonHoverColor}`
          }`}
          onClick={() => onSelectConversation(conversation)}
        >
          <IconMessage className="mr-2 min-w-[20px]" size={18} />

          <div className="overflow-hidden whitespace-nowrap overflow-ellipsis pr-1">
            {conversation.messages.filter((message) => message.role !== "system")[0]
              ? conversation.messages.filter((message) => message.role !== "system")[0].content
              : "Empty conversation"}
          </div>

          <IconTrash
            className="ml-auto min-w-[20px] text-neutral-400 hover:text-neutral-100"
            size={18}
            onClick={(e) => {
              e.stopPropagation();
              onDeleteConversation(conversation);
            }}
          />
        </div>
      ))}
    </div>
  );
};
