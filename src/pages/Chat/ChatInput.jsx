import { useState } from "react";
import { RiUserSearchFill } from "react-icons/ri";
import { VscSend } from "react-icons/vsc";
import { IoExitOutline } from "react-icons/io5";
import { IoHomeOutline } from "react-icons/io5";
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
    <div className="flex bottom-row-wrapper max-w-fit gap-4 h-12 my-3 text-zinc">
      <RoomActionButton isInRoom={isInRoom} handleLeaveRoom={handleLeaveRoom} />
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
      {isInRoom
        ? <SendButton isMessageEmpty={isMessageEmpty} onSendMessage={onSendMessage} />
        : <JoinRoomButton handleJoinRoomInChat={handleJoinRoomInChat} />
      }
    </div>
  );
};

const LeaveRoomButton = ({ handleLeaveRoom }) => (
  <button
    title="Leave room"
    onClick={handleLeaveRoom}
    className="leaveRoom rounded-xl text-base tracking-tight border-gray-100 bg-warning px-4 font-medium text-white transition duration-200 ease-in-out hover:bg-[#c1121f]"
  >
    <IoExitOutline />
  </button>
);

const GoToPreferencesButton = () => (
  <button
    title="Go back to preferences"
    className="leaveRoom rounded-xl text-base tracking-tight border-gray-100 bg-warning px-4 font-medium text-white transition duration-200 ease-in-out hover:bg-[#c1121f]"
  >
    <Link to="/preferences">
      <IoHomeOutline />
    </Link>
  </button>
);

const RoomActionButton = ({ isInRoom, handleLeaveRoom }) => (
  isInRoom ? <LeaveRoomButton handleLeaveRoom={handleLeaveRoom} /> : <GoToPreferencesButton />
);


const SendButton = ({ isMessageEmpty, onSendMessage }) => (
  <button
    title="Send message"
    className={`
      sendButton rounded-xl bg-secondary px-5 py-4 border-gray-100 font-bold
      transition duration-200 ease-in-out
      ${isMessageEmpty
        ? 'text-gray-400 cursor-not-allowed'
        : 'text-gray-300 hover:text-white hover:border-white'
      }
    `}
    onClick={onSendMessage}
    disabled={isMessageEmpty}
  >
    <VscSend />
  </button>
);

const JoinRoomButton = ({ handleJoinRoomInChat }) => (
  <button
    title="Join a room again"
    className="
      sendButton rounded-xl bg-homebg px-5 py-4 font-bold text-zinc
      hover:text-black transition duration-200 ease-in-out
    "
    onClick={handleJoinRoomInChat}
  >
    <RiUserSearchFill />
  </button>
);


export default ChatInput;