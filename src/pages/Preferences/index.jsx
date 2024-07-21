import { Link } from "react-router-dom";
import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import debug from "../../assets/debug.png"
import mock from "../../assets/mock.png"
import pair from "../../assets/pair.png"


const PreferenceCard = ({ title, description, image, location }) => {
  return (
    <div className="py-5 px-4 lg:py-12 lg:px-10 text-zinc flex flex-col justify-evenly shadow-sm rounded-xl border border-secondary/20">
      <img className="w-12 md:w-16 lg:w-24 h-12 md:h-16 lg:h-24" src={image} />
      <h2 className="text-base lg:text-2xl font-bold w-fit leading-tight tracking-tight mt-1 md:mt-2">{title}</h2>
      <p className="w-44 lg:w-52 mt-1 md:mt-3 text-xs md:text-sm lg:text-base lg:font-light font-medium leading-4 line-clamp-3">{description}</p>
      <Link to={"/chat/" + location}>
        <button className="mt-3 px-3 py-2 w-fit hover:scale-105 transition-transform duration-200 ease-in-out bg-secondary rounded-lg justify-center items-center text-white text-xs font-semibold" title="Get Matched with users">
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
    <div className="windowcontainer my-20 rounded-2xl border border-lightzinc bg-white mx-10 py-6 md:py-10 md:px-10">
      <div className="content font-Inter flex flex-col md:max-w-screen-sm lg:max-w-none justify-center items-center px-4">
        <div className="textsection w-fit flex-col text-center justify-start gap-1 md:gap-2 inline-flex">
          <h1 className="text-zinc text-xl md:text-2xl lg:text-3xl font-semibold leading-8 tracking-tight">Select your preferences</h1>
          <p className="max-w-fit text-zinc text-base md:text-xl lg:text-2xl lg:font-light font-medium tracking-tight">Choose one of the options to get started with finding people that share your interests.</p>
        </div>
        {/* Preference Card here */}
        <div className="cards-container flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-12 justify-center items-center mt-6 w-fit center">
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
    <main className="min-h-full min-w-full relative flex justify-center items-center bg-primary">
      <Header />
      <PreferenceWindow />
      <Footer />
    </main>
  );
};

