import { Chat } from "@/components/Chat/Chat";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { Conversation, Message, OpenAIModel } from "@/types";
import Head from "next/head";
import { useEffect, useState } from "react";

function safeLocalStorage(action: 'get' | 'set' | 'remove', key: string, value?: any): any {
	try {
		if (action === 'get') {
			return localStorage.getItem(key);
		} else if (action === 'set' && value !== undefined) {
			return localStorage.setItem(key, value);
		} else if (action === 'remove') {
			return localStorage.removeItem(key);
		}
	} catch (error) {
		console.warn('Failed to access localStorage:', error);
		return null;
	}
}

export default function Home() {
	const [conversations, setConversations] = useState<Conversation[]>([]);
	const [selectedConversation, setSelectedConversation] = useState<Conversation>();
	const [loading, setLoading] = useState<boolean>(false);
	const [model, setModel] = useState<OpenAIModel>(OpenAIModel.GPT_3_5);
	const [lightMode, setLightMode] = useState<"dark" | "light">("dark");

	const handleSend = async (message: Message) => {
  if (selectedConversation) {
    let updatedConversation: Conversation = {
      ...selectedConversation,
      messages: [...selectedConversation.messages, message],
    };

    safeLocalStorage(
      "set",
      "selectedConversation",
      JSON.stringify(updatedConversation)
    );
    setLoading(true);

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages: updatedConversation.messages,
      }),
    });

    if (!response.ok) {
      setLoading(false);
      throw new Error(response.statusText);
    }

    const data = await response.text(); // Read the whole response text

    setLoading(false);

    // Create the assistant's message
    const assistantMessage: Message = {
      role: "assistant",
      content: data,
    };

    // Update the conversation with the assistant's message
    updatedConversation = {
      ...updatedConversation,
      messages: [...updatedConversation.messages, assistantMessage],
    };

    setSelectedConversation(updatedConversation);

    // Update the conversations and localStorage
    const updatedConversations: Conversation[] = conversations.map((conversation) => {
      if (conversation.id === selectedConversation.id) {
        return updatedConversation;
      }

      return conversation;
    });

    setConversations(updatedConversations);
    safeLocalStorage(
      "set",
      "conversationHistory",
      JSON.stringify(updatedConversations)
    );

    safeLocalStorage(
      "set",
      "selectedConversation",
      JSON.stringify(updatedConversation)
    );
  }
};




	const handleLightMode = (mode: "dark" | "light") => {
		setLightMode(mode);
		safeLocalStorage('set', 'theme', mode);
	};

	const handleNewConversation = () => {
  const newConversation: Conversation = {
    id: conversations.length + 1,
    name: "",
    messages: []
  };

  setConversations([newConversation]);
  
  const updatedConversations: Conversation[] = [...conversations, newConversation];

  setConversations(updatedConversations);
  safeLocalStorage('set', 'conversationHistory', JSON.stringify(updatedConversations));

  setSelectedConversation(newConversation);
  safeLocalStorage('set', 'selectedConversation', JSON.stringify(newConversation));
};


	useEffect(() => {
		const themeInLocalStorage = safeLocalStorage('get', 'theme');

		if (themeInLocalStorage && (themeInLocalStorage === "dark" || themeInLocalStorage === "light")) {
			setLightMode(themeInLocalStorage);
		}

		const conversationHistoryInLocalStorage = safeLocalStorage('get', 'conversationHistory');

		if (conversationHistoryInLocalStorage) {
			const conversationHistory: Conversation[] = JSON.parse(conversationHistoryInLocalStorage);

			setConversations(conversationHistory);

			const selectedConversationInLocalStorage = safeLocalStorage('get', 'selectedConversation');


			if (selectedConversationInLocalStorage) {
				const selectedConversation: Conversation = JSON.parse(selectedConversationInLocalStorage);

				setSelectedConversation(selectedConversation);
			}
		}
	}, []);

	return (
		<>
			<Head>
				<title>OpenAI Chat UI Demo</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className={`h-screen ${lightMode === "light" ? "bg-white" : "bg-gray-900"} relative`}>
				<Sidebar
					conversations={conversations}
					selectedConversation={selectedConversation}
					onNewConversation={handleNewConversation}
					onSelectConversation={(conversation: Conversation) => {
  setSelectedConversation(conversation);
  safeLocalStorage("set", "selectedConversation", JSON.stringify(conversation));
}}
					onToggleLightMode={handleLightMode}
					lightMode={lightMode}
				/>
				{selectedConversation && (
					<Chat
						conversation={selectedConversation}
						lightMode={lightMode}
						model={model}
						messages={selectedConversation.messages} 
						onSend={handleSend}
						loading={loading}
						onModelChange={(model: OpenAIModel) => setModel(model)}
					/>
				)}
			</div>
		</>
	);
}