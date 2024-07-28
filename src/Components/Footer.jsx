import React from "react";

function Footer() {
  return (
    <div className="background bg-black h-[10vh] flex flex-col md:flex-row justify-center items-center  text-white w-full">
      <h1 className="text-2xl  md:text-2xl font-bold text-center">
        <span className="text-green-500">&lt;</span>
        Password<span className="text-green-500">Manager</span>
        <span className="text-green-500">/&gt;</span>
      </h1>

      <h1 className="text-xl  font-bold text-center mt-2 md:mt-0  ">
        Made with ❤️ by TOJAMMEL HOQUE
      </h1>
    </div>
  );
}

export default Footer;
