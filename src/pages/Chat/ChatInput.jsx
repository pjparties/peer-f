import { useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { MdExitToApp } from "react-icons/md";
import { IoHome } from "react-icons/io5";
import { Link } from "react-router-dom";



const ChatInput = ({ isInRoom, handleSendMessage, handleLeaveRoom, handleJoinRoomInChat }) => {
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
    <div className="flex bottom-row-wrapper max-w-fit gap-2 md:gap-4 h-8 md:h-12 my-3 md:my-6 text-zinc">
      {isInRoom ? <LeaveRoomButton handleLeaveRoom={handleLeaveRoom} /> : <GoToPreferencesButton />}
      <input
        disabled={!isInRoom}
        type="text"
        value={chatMessage}
        className="input-area bg-user2 min-h-fit pl-4 w-[55vw] lg:w-[65vw] rounded-lg border-2 border-gray-100 transition-transform duration-400 ease-in-out"
        onChange={(e) => setChatMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !isMessageEmpty) {
            e.preventDefault();
            onSendMessage();
          }
        }}
        placeholder="Type your message..."
      />
      {isInRoom
        ? <SendButton isMessageEmpty={isMessageEmpty} onSendMessage={onSendMessage} />
        : <SearchUserButton handleJoinRoomInChat={handleJoinRoomInChat} />
      }
    </div>
  );
};

const LeaveRoomButton = ({ handleLeaveRoom }) => (
  <button
    title="Leave room"
    onClick={handleLeaveRoom}
    className="leaveRoom flex items-center rounded-lg md:rounded-xl text-lg border-gray-100 bg-warning px-2 md:px-4 py-4 font-semibold text-white transition-colors duration-200 ease-in-out hover:bg-[#c1121f]"
  >
    <MdExitToApp />
  </button>
);

const GoToPreferencesButton = () => (
  <Link
    title="Go back to preferences"
    to="/preferences"
    className="leaveRoom flex items-center rounded-lg md:rounded-xl text-lg border-gray-100 bg-warning px-2 md:px-4 py-4 font-semibold text-white transition-colors duration-200 ease-in-out hover:bg-[#c1121f]"
  >
    <IoHome />
  </Link>
);


const SendButton = ({ isMessageEmpty, onSendMessage }) => (
  <button
    title="Send message"
    className={`
      sendButton flex items-center rounded-lg md:rounded-xl bg-secondary px-2 md:px-4 py-4 border-gray-100 font-bold
      transition-colors duration-200 ease-in-out
      ${isMessageEmpty
        ? 'text-gray-400 cursor-not-allowed'
        : 'text-gray-300 hover:text-white hover:border-white'
      }
    `}
    onClick={onSendMessage}
    disabled={isMessageEmpty}
  >
    <IoSend />
  </button>
);

const SearchUserButton = ({ handleJoinRoomInChat }) => (
  <button
    title="Search user again"
    className="
      sendButton flex items-center rounded-lg md:rounded-xl bg-homebg hover:bg-accentdark px-2 md:px-4 py-4 font-bold text-zinc
      hover:text-black transition-colors duration-200 ease-in-out
    "
    onClick={handleJoinRoomInChat}
  >
    <FaUserPlus />
  </button>
);


export default ChatInput;