import Image from "next/image";
import { Fade } from "react-reveal";

function FeatureShowcase(props) {
  return (
    <div
      className={`mt-24 mb-44 flex-col lg:flex-row lg:mx-auto mx-auto flex w-full gap-x-10 lg:justify-between ${
        props.isReversed
          ? "lg:flex-row-reverse lg:text-right"
          : "lg:flex-row lg:text-left"
      }`}
    >
      <Fade right duration={1000}>
        <div className="w-full">
          <h2 className="font-bold text-3xl w-full md:mx-auto">
            <span className="text-blupayBlue">{props.firstLineText}</span>
            <br />
            {props.secondLineText}
          </h2>
          <p className="mt-5 lg:mt-10">{props.subText}</p>
        </div>
      </Fade>
      <Fade left duration={1000}>
        <Image
          src={props.image}
          alt={props.subText}
          className="md:max-w-md lg:max-w-xl mt-10 lg:mt-0 lg:mx-0 mx-auto shadow-lg rounded-lg object-contain"
        />
      </Fade>
    </div>
  );
}

export default FeatureShowcase;
