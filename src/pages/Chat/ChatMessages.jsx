const ChatMessages = ({ messages }) => {
  return (
    <div className="w-full h-full overflow-y-scroll scroll-m-2 flex flex-col">
      <div className="flex-grow p-4">
        {messages.map((message, index) => (
          <div key={index} className={`mb-4 flex ${message.sender === 'you' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[70%] p-1 border border-gray-300 rounded-lg text-zinc ${message.sender === 'you' ? 'bg-user1' : 'bg-user2'}`}>
              <div className="flex flex-col">
                <span className="text-base">{message.text}</span>
                <span className="text-xs text-gray-500 text-right mr-1 mt-1">
                  {formatTimestamp(message.timestamp)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper function to format the timestamp
const formatTimestamp = (timestamp) => {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export default ChatMessages;