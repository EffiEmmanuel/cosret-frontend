import Image from "next/image";
import { FaPray } from "react-icons/fa";
import { Fade } from "react-reveal";

function StatCard(props) {
  return (
    <Fade up duration={800} delay={100}>
      <div className=" mt-5 doodleBg h-[170px] w-[170px] md:max-w-md text-white p-12 rounded-xl">
        <div className="w-full flex justify-center">{props.icon}</div>
        <h3 className="text-3xl mt-7 text-center font-bold">{props.title}</h3>
        <p className="mt-4 text-center">{props.description}</p>
      </div>
    </Fade>
  );
}

export default StatCard;
