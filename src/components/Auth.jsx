
const AuthButton = ({title, target, signIn}) => {
  return (
    // responsive login button blue color fixed size
    <button
      className="h-12 w-32 rounded-lg bg-accent font-bold text-white transition duration-300 ease-in-out transform hover:scale-110 hover:bg-accentdark"
      onClick={signIn}
    >
      {title}
    </button>
  );
};

const Auth = () => {
  return (
    <div className="flex h-screen w-2/5 min-w-fit flex-col">
      <div className="main-wrapper my-4 flex h-full w-full flex-col items-center justify-center gap-4 px-4 py-2">
        <div className="text-wrapper">
          <h1 className="text-center text-4xl font-bold text-white ">
            Get Started
          </h1>
          <p className="text-lg font-medium text-white">
            Sign up or login to get started
          </p>
        </div>
        <div className="buttons-wrapper flex flex-col items-center justify-center gap-4">
          <AuthButton
            title="Sign In"
            target="/"
            signIn={() => { }}
          />
        </div>
      </div>
    </div>
  );
};

export default Auth;
