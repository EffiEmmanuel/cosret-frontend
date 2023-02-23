import Image from "next/image";
import { FaPray } from "react-icons/fa";
import { Fade } from "react-reveal";

function ValueCard(props) {
  return (
    <Fade up duration={800} delay={100}>
      <div className=" mt-5 doodleBg max-w-sm md:max-w-md text-white p-16 rounded-2xl">
        <Image
          src={props.image}
          alt={props.title}
          className="w-24 h-24 -mt-5 rounded-full mx-auto object-cover"
        />
        <h3 className="text-2xl mt-7 text-center font-bold">{props.title}</h3>
        <p className="mt-4 text-center">{props.description}</p>
      </div>
    </Fade>
  );
}

export default ValueCard;
