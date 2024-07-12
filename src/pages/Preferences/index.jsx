import { Link } from "react-router-dom";
import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import debug from "../../assets/debug.png"
import mock from "../../assets/mock.png"
import pair from "../../assets/pair.png"


const PreferenceCard = ({ title, description, image, location }) => {
  return (
    <div className="py-5 px-4 text-zinc flex flex-col justify-evenly shadow-sm rounded-xl border border-secondary/20">
      <img className="w-16 h-16" src={image} />
      <h2 className="left-4 top-16 text-base font-bold w-fit leading-tight tracking-tight mt-2">{title}</h2>
      <p className="w-44 mt-3 text-xs font-medium leading-4 line-clamp-3">{description}</p>
      <Link to={"/chat/"+location}>
        <button className="mt-3 px-3 py-2 w-fit hover:scale-105 transition-all duration-200 ease-in-out bg-secondary rounded-lg justify-center items-center text-white text-xs font-semibold">
          Start Chat
        </button>
      </Link>
    </div>
  );
};

const PreferenceWindow = () => {
  const Preferences = [
    {
      title: "Pair Programming",
      description: "Connect to work on a project together, share ideas and learn from each other.",
      image: pair,
      location: "1",
    },
    {
      title: "Mock Interview",
      description: "Got an interview coming up? Practice with someone who can help you prepare.",
      image: mock,
      location: "2",
    },
    {
      title: "Code Debug",
      description: "Stuck on a bug? Get help from someone who can help you debug your code.",
      image: debug,
      location: "2",
    },
  ];
  return (
    <div className="windowcontainer rounded-2xl border border-lightzinc bg-white p-10">
      <div className="content font-Inter flex flex-col justify-center items-center px-4">
        <div className="textsection flex-col justify-start gap-2 inline-flex">
          <h1 className="text-zinc text-xl font-semibold leading-8 tracking-tight">Select your preferences</h1>
          <p className="w-full text-zinc text-lg font-medium leading-7 tracking-tight">Choose one of the options to get started with finding people that share your interests.</p>
        </div>
        {/* Preference Card here */}
        <div className="cards-container flex flex-row gap-8 justify-center items-center mt-6 w-fit center">
          {Preferences.map((preference) => (
            <PreferenceCard
              key={preference.location}
              title={preference.title}
              description={preference.description}
              image={preference.image}
              location={preference.location}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export const Preferences = () => {
  return (
    <main className="flex h-screen w-screen flex-col justify-center items-center bg-primary">
      <Header />
      <PreferenceWindow />
      <Footer />
    </main>
  );
};

