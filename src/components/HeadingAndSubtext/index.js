function HeadingAndSubtext(props) {
  return (
    <>
      <h2
        className={`" font-bold ${
          props.textSize ? "text-4xl lg:text-4.5xl" : "text-4xl"
        }`}
      >
        {props.heading}
      </h2>
      <p
        className={`" mt-5 ${
          props.textSize ? "lg:mt-12 lg:text-lg text-md" : ""
        }`}
      >
        {props.subtext}
      </p>
    </>
  );
}

export default HeadingAndSubtext;
