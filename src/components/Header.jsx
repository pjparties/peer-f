import { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Header = () => {
  // State to manage the navbar's visibility
  const [nav, setNav] = useState(false);

  // Toggle function to handle the navbar's display
  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className='bg-transparent w-screen absolute top-0 flex justify-between items-center py-6 px-8 md:px-16 lg:px-24'>
      {/* Logo */}
      <Link to='/'>
        <h1 className='text-secondary hover:text-accent font-bold text-2xl'>
          Peer.io
        </h1>
      </Link>
    </div>
  );
};

export default Header;