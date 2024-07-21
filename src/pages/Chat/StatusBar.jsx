const StatusBar = ({ status }) => {
  return (
    <p className="statusContainer w-fit my-4 text-center mx-4 font-semibold font-Inter text-gray-800 transition-transform duration-1000 ease-in">
      {status}
    </p>
  );
};

export default StatusBar;