import React, { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4 h-[7vh]">
        <div className="flex items-center logo text-2xl font-bold h-14">
          <span className="text-green-500">&lt;</span>
          Password<span className="text-green-500">Manager</span>
          <span className="text-green-500">/&gt;</span>
        </div>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-black focus:outline-none"
          >
            <i className="fa fa-bars text-2xl"></i>
          </button>
        </div>
        <ul className="hidden md:flex gap-4">
          <li>
            <a className="hover:font-bold" href="#">
              Home
            </a>
          </li>
          <li>
            <a className="hover:font-bold" href="#">
              About
            </a>
          </li>
          <li>
            <a className="hover:font-bold" href="#">
              Contact
            </a>
          </li>
        </ul>
      </div>
      <div
        className={`md:hidden ${
          isOpen ? "block" : "hidden"
        } bg-white shadow-md px-4 pb-4`}
      >
        <ul className="flex flex-col gap-4">
          <li>
            <a className="hover:font-bold" href="#">
              Home
            </a>
          </li>
          <li>
            <a className="hover:font-bold" href="#">
              About
            </a>
          </li>
          <li>
            <a className="hover:font-bold" href="#">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
