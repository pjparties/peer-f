const StatusBar = ({ status }) => {
  return (
    <p className="w-fit my-4 font-medium text-gray-800 transition duration-1000 ease-in">
      {status}
    </p>
  );
};

export default StatusBar;