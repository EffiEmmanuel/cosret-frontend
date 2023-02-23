import Image from "next/image";

function FigImageWithCaption(props) {
  console.log("COUNTRYYYY:", props.country);

  const imageName = `${props.country}.png`;
  console.log("FILE NAME:", imageName);

  return (
    <div className="w-full flex justify-center my-10 text-white text-center">
      <div className="mx-auto">
        <div className="mx-auto h-32 w-32">
          <Image
            src={props.image}
            alt={props.caption}
            className="rounded-[50%] w-full h-full object-cover"
          />
        </div>
        <p className="mt-6 font-light">{props.caption}</p>
        <p className="mt-3 font-medium">{props.role}</p>
      </div>
    </div>
  );
}

export default FigImageWithCaption;
