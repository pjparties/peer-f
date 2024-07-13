import { useState } from "react";
import { VscSend } from "react-icons/vsc";

const ChatInput = ({ isInRoom, handleSendMessage, handleLeaveRoom }) => {
  const [chatMessage, setChatMessage] = useState("");

  const onSendMessage = () => {
    const trimmedMessage = chatMessage.trim();
    if (trimmedMessage !== "") {
      handleSendMessage(trimmedMessage);
      setChatMessage("");
    }
  };

  const isMessageEmpty = chatMessage.trim() === "";

  return (
    <div className="flex bottom-row-wrapper max-w-fit gap-4 h-12 my-3 text-zinc">
      <button
        onClick={handleLeaveRoom}
        className="leaveRoom rounded-xl text-base tracking-tight border-gray-100 bg-warning px-4 font-medium text-white transition duration-200 ease-in-out hover:bg-[#c1121f]"
      >
        Leave Room
      </button>
      <input
        type="text"
        value={chatMessage}
        className="input-area bg-user2 min-h-fit pl-4 w-[50vw] lg:w-[60vw] rounded-lg border-2 border-gray-100 transition-all duration-400 ease-in-out"
        onChange={(e) => setChatMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !isMessageEmpty) {
            e.preventDefault();
            onSendMessage();
          }
        }}
        placeholder="Type your message..."
      />
      <button
        className={`sendButton rounded-xl bg-secondary px-5 py-4 border-gray-100 font-bold ${isMessageEmpty ? 'text-gray-400 cursor-not-allowed' : 'text-gray-300 hover:text-white hover:border-white'
          } transition duration-200 ease-in-out`}
        onClick={onSendMessage}
        disabled={isMessageEmpty}
      >
        <VscSend />
      </button>
    </div>
  );
};

export default ChatInput;