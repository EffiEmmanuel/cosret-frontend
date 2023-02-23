import Link from "next/link";
import { useEffect, useState } from "react";
const { default: Image } = require("next/image");
const { default: NavLinks } = require("./NavLinks");

function Navbar(props) {
  return (
    <div
      className={`flex align-middle bg-black transition-[background-color] ease-in-out fixed top-0 z-50 w-full justify-between align-middle px-10 py-7`}
    >
      <h2 className="font-bold text-white text-xl">COSRET</h2>
      <NavLinks />
    </div>
  );
}

export default Navbar;
