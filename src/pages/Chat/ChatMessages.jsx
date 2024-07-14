import ScrollableFeed from 'react-scrollable-feed'
const ChatMessages = ({ messages }) => {
  return (
    <div className="w-full h-full overflow-hidden flex flex-col">
      <ScrollableFeed forceScroll={true} className='p-4 scroll-smooth'>
        {messages.map((message, index) => (
          <div key={index} className={`mb-4 flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[70%] p-2 border border-gray-300 rounded-lg text-zinc ${message.sender === 'You' ? 'bg-user1' : 'bg-user2'}`}>
              <div className="flex flex-col">
                <span className="text-sm font-semibold">{message.text}</span>
                <span className="text-xs text-gray-500 leading-tight tracking-tighter text-right mr-1 mt-1">
                  {formatTimestamp(message.timestamp)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </ScrollableFeed>
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