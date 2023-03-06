import Navbar from "@/components/Navbar";
import Image from "next/image";
import Footer from "../Footer";

function Layout(props) {
  return (
    <div className="scrollbar-thin">
      {/* NAVBAR */}
      {!props.isDashboard && <Navbar />}
      <main className="pt-32 min-h-screen">{...props.children}</main>

      {!props.isDashboard && <Footer />}
    </div>
  );
}

export default Layout;
