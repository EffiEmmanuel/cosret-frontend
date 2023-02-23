import Link from "next/link";
import { useState } from "react";
import {
  FaBarcode,
  FaBars,
  FaHamburger,
  FaLine,
  FaTimes,
  FaWindowClose,
} from "react-icons/fa";

const { default: NavItem } = require("../NavItem/item");

function NavLinks() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <nav className="text-white">
      <FaBars
        size={28}
        fontWeight={300}
        onClick={() => {
          setIsMobileMenuOpen(true);
        }}
        className="cursor-pointer md:hidden"
      />
      <ul className="md:flex hidden justify-between w-full gap-14">
        <NavItem link="/" linkText="Home" />
        <NavItem link="/about-cosret" linkText="About" />
        <NavItem link="/company/support" linkText="Support" />
        <NavItem link="/login" linkText="Log in" />
        <NavItem link="/accounts/sign-up" linkText="Sign up" />
      </ul>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="min-h-screen md:hidden bg-black fixed z-10 olute top-0 right-0 w-2/3">
          <FaTimes
            size={28}
            onClick={() => setIsMobileMenuOpen(false)}
            className="float-right mt-7 mr-10 cursor-pointer"
          />
          <ul className="flex flex-col align-middle mt-44  justify-between w-full gap-14">
            <Link
              className="px-14 hover:bg-white hover:text-black py-5"
              href="/"
            >
              Home
            </Link>
            <Link
              className="px-14 hover:bg-white hover:text-black py-5"
              href="/about-cosret"
            >
              About
            </Link>

            <Link
              className="px-14 hover:bg-white hover:text-black py-5"
              href="/company/support"
            >
              Support
            </Link>
            <Link
              className="px-14 hover:bg-white hover:text-black py-5"
              href="/login"
            >
              Log in
            </Link>
            <Link
              className="px-14 hover:bg-white hover:text-black py-5"
              href="/accounts/sign-up"
            >
              Sign up
            </Link>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default NavLinks;
