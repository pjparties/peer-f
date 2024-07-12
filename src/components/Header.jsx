import { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

const Header = () => {
  // State to manage the navbar's visibility
  const [nav, setNav] = useState(false);

  // Toggle function to handle the navbar's display
  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className='bg-primary flex justify-between items-center py-6 px-24'>
      {/* Logo */}
      <h1 className='text-secondary font-bold text-2xl'>
        Peer.io
      </h1>
      {/* Desktop Navigation */}
      <ul className='hidden md:flex'>
        <li >
          <span to='/' className='p-4 hover:text-accent hover:font-bold text-secondary mr-1 py-[10px] px-6 cursor-pointer duration-100' >
            HOME
          </span>
        </li>
        <li>
          <span to='/' className='p-4 hover:text-accent hover:font-bold text-secondary mr-1 py-[10px] px-6 cursor-pointer duration-100'>
            ABOUT
          </span>
        </li>
      </ul>

      {/* Mobile Navigation Icon */}
      <div onClick={handleNav} className='block md:hidden z-10'>
        {nav ? <AiOutlineClose size={20} className='text-secondary' /> : <AiOutlineMenu size={20} className='text-secondary' />}
      </div>
      {/* Mobile Navigation Menu */}
      <ul
        className={
          nav
            ? 'fixed md:hidden z-0 top-0 w-[100%] bg-background ease-in-out duration-500 h-[100%] left-0 flex flex-col items-center justify-center'
            : 'md:hidden ease-in-out w-[100%] left-0 flex flex-col items-center justify-center -z-10 duration-500 fixed bottom-0 top-[-200%] '
        }
      >
        {/* Mobile Navigation Items */}
        <li className='my-[12px] mr-[1px]'>
          <span to="/" className='p-4 hover:text-accent text-lg px-[24px] hover:font-bold text-secondary py-[10px] cursor-pointer duration-100'>
            HOME
          </span>
        </li>
        <li className='my-[12px] mr-[1px]'>
          <span to="/" className='p-4 hover:text-accent text-lg my-[12px] px-[24px] hover:font-bold text-secondary mr-1 py-[10px]  cursor-pointer duration-100'>
            ABOUT
          </span>
        </li>
      </ul>
    </div>
  );
};

export default Header;