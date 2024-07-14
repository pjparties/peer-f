import { SignUp } from '@clerk/clerk-react';

const Signup = () => {

  return (
    <div className="w-full min-h-full bg-primary flex items-center justify-center flex-col gap-4">
      <SignUp routing='path' path='/signup' appearance={{
        variables: {
          colorText: "#333333",
          colorPrimary: "#214842"
        },
        elements: {
          headerTitle: "text-2xl",
        },
        layout: {
          socialButtonsPlacement: 'bottom',
          socialButtonsVariant: 'iconButton',
        }
      }} />

    </div>
  );
};

export default Signup;