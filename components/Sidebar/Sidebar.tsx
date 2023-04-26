import { Conversation } from "@/types";
import { IconPlus } from "@tabler/icons-react";
import { FC } from "react";
import { Conversations } from "../Conversations";
import { SidebarSettings } from "./SidebarSettings";

interface Props {
  conversations: Conversation[];
  lightMode: "light" | "dark";
  selectedConversation?: Conversation;
  onNewConversation: () => void;
  onToggleLightMode: (mode: "light" | "dark") => void;
  onSelectConversation: (conversation: Conversation) => void;
  onDeleteConversation: (conversation: Conversation) => void;
}

export const Sidebar: FC<Props> = ({ conversations, lightMode, selectedConversation, onNewConversation, onToggleLightMode, onSelectConversation, onDeleteConversation }) => {
  const themeClass = lightMode === "light" ? "orange-theme" : "black-theme";
  const buttonBgColor = lightMode === "light" ? "bg-orange-500" : "bg-black";
  const buttonHoverColor = lightMode === "light" ? "hover:bg-orange-600" : "hover:bg-gray-800";

  return (
    <div className={`flex flex-col space-y-2 ${themeClass}`}>
    <div className={`flex flex-col min-w-[260px] ${themeClass}`}>

      <div className={`flex flex-col items-center space-y-2 pb-2 ${themeClass}`}>
          <SidebarSettings
            className="w-full"
            lightMode={lightMode}
            onToggleLightMode={onToggleLightMode}
          />
        <button
          className={`flex items-center w-[240px] h-[40px] rounded-lg ${buttonBgColor} border border-neutral-600 text-sm ${buttonHoverColor}`}
          onClick={onNewConversation}
        >
          <IconPlus
            className="ml-4 mr-3"
            size={16}
          />
          New chat
        </button>
      </div>

      <div className="flex-1 mx-auto pb-2 overflow-auto">
        <Conversations
          conversations={conversations}
          selectedConversation={selectedConversation}
          onSelectConversation={onSelectConversation}
          onDeleteConversation={onDeleteConversation}
          lightMode={lightMode}
        />
      </div>

      
    </div>
    </div>
  );
  
};
