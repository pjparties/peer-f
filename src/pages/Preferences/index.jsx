import { useNavigate } from "react-router-dom";
import LeftHero from "../../components/LeftHero.jsx";
import { useState } from "react";

const Selector = () => {
    const navigate = useNavigate();
    const [selection, setSelection] = useState([
        { id: 1 , name: "Pair Programming", select: false},
        { id: 2 , name: "Mock Interview", select: false},
        { id : 3 , name: "Code Debug", select: false},
    ]);
    
    const currentSelection = selection.filter((item) => item.select === true);
    
    const toggleSelect = (e) => {
        const buttonId = e.target.id;
        const newList = selection.map((item) => {
            if (item.id === parseInt(buttonId)) {
                return { ...item, select: !selection[buttonId - 1].select};
            } else {
                return { ...item, select: false };
            }
        });
        setSelection(newList);
    };

    const routeChat = () => {
        if (currentSelection.length === 0) {
            return () => {
                window.alert("Select a preference to continue.");
            };
        } else {
            return () => {
                // console.log("Routing to chat");
                navigate(`/chat/${currentSelection[0].id}`);
            };
        }
    }

    return (
        <div className="flex h-full flex-col items-center justify-center">
            <div className="mt-16 gap-2 flex flex-col items-center">
                {selection.map((item) => {
                    return (
                        <button
                            id={item.id}
                            className={`border-1 rounded-xl border-black px-4 py-2 transition duration-200 ease-in-out ${item.select ? "scale-110 bg-primary" : "bg-omeglebg opacity-80"}`}
                            onClick={toggleSelect}
                        >
                            {item.name}
                        </button>
                    );
                })}
            </div>

            <div className="mt-16 flex flex-col items-center">
                <div onClick={routeChat()}>
                    <button className="border-1 rounded-xl bg-accent px-4 py-2 font-semibold text-white transition duration-500 ease-in-out hover:bg-accentdark ">
                        Start Chatting
                    </button>
                </div>
            </div>
        </div>
    );
};

const PrefDiv = () => {
    return (
        <div>
            <div className="text-wrapper mb-16 flex flex-col px-6 text-center">
                <h1 className=" text-4xl mt-10 font-bold text-white ">
                    Select Your Preferences
                </h1>
                <p className="mt-2 text-lg font-normal text-white">
                    Choose one to get started with finding people that share
                    your interests.
                </p>
            </div>
            <div className="main-preferences-wrapper">
                <Selector />
            </div>
        </div>
    );
};

export const Preferences = () => {
    return (
        <div className="flex flex-row">
            <div className="h-full w-3/5 border-r-4 bg-primary">
                <LeftHero />
            </div>
            <div className="flex h-screen w-2/5 flex-col items-center bg-secondary">
                <PrefDiv />
            </div>
        </div>
    );
};

