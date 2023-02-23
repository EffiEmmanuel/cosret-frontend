import Link from "next/link";

function NavItem(props) {
  return (
    <li className="group">
      <Link href={props.link}>{props.linkText}</Link>
      <div className="group-hover:block h-1 w-10 bg-white transition-all ease-in-out duration-700 text-center hidden rounded-lg mx-auto"></div>
    </li>
  );
}

export default NavItem;
