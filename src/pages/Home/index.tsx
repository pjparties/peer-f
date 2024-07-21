import Auth from "../../components/Auth.jsx";
import Header from "../../components/Header.jsx";
import HeroConvo from "../../assets/hero.png";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <main className="Hero-container flex lg:flex-row flex-col h-screen w-full font-Inter">
      {/* left container */}
      <div className="left-container h-full lg:w-1/2 bg-primary flex -mt-20 lg:mt-0 items-center justify-center">
        <div className="text-container w-3/4 h-1/2 flex-col justify-center items-start lg:ml-24 mt-28 lg:mt-0 flex">
          <h1 className="text-secondary text-4xl font-extrabold">Peer.io —</h1>
          <p className="text-zinc text-3xl font-medium pr-16 pb-10">A decentralized real-time chat app for collaboration and productivity.</p>
          <p className="text-zinc text-lg font-medium leading-7 pb-6">You will be matched with like-minded individuals to collaborate and learn from each other in real-time.</p>
          <Link to="/preferences">
            <button title="Start Chatting" className="px-3 py-2 bg-secondary rounded-md justify-center items-center inline-flex text-white text-base font-semibold leading-7 hover:scale-105 transition-all duration-200 ease-in-out">
              Let&apos;s get started
            </button>
          </Link>
        </div>
      </div>
      {/* right container */}
      <div className="container min-w-full lg:min-w-0 lg:w-1/2 bg-homebg flex justify-center items-center">
        <img src={HeroConvo} alt="Hero" className="lg:mr-8" />
      </div>
    </main>
  );
};

