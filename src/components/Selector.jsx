import { useState } from "react";

export const Selector = () => {
  const [selection, setSelection] = useState([
    { type: "Pair Programming", select: false, id: 1 },
    { type: "Mock Interview", select: false, id: 2 },
    { type: "Code Debug", select: false, id: 3 },
  ]);
  const sendData = () => {
    const selectedIds = selection.map((item) => item.id);
    console.log(selectedIds);

    const obj = JSON.stringify({ preferences: selectedIds });

    fetch("/api/preferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: obj,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  const toggleSelect = (e) => {
    const buttonId = e.target.id;
    const newList = selection.map(item => ({
      ...item,
      select: item.type === buttonId
    }));
    setSelection(newList);
  };

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="mt-16 gap-2 flex flex-col items-center" id={`${selection.map.item?.id | "hello" }`}>
        {selection.map((item) => {
          return (
            <button
              id={item.type}
              className={`border-1 rounded-xl border-black px-4 py-2 transition duration-200 ease-in-out ${item.select ? "scale-110 bg-primary" : "bg-omeglebg opacity-80"}`}
              onClick={toggleSelect}
            >
              {item.type}
            </button>
          );
        })}
      </div>

      <div className="mt-16 flex flex-col items-center">
        <div onClick={sendData}>
          <a href='/chat'>
            <button className="border-1 rounded-xl bg-accent px-4 py-2 font-semibold text-white transition duration-500 ease-in-out hover:bg-accentdark ">
              Start Chatting
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};