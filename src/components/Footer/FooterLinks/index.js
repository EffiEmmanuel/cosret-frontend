function FooterLinks(props) {
  const linkHeadingLowerCase = props.linkHeading.toLowerCase();
  const linkHeadingSlug = linkHeadingLowerCase.replace(/ /g, "-");
  return (
    <div
      className={`w-1/4 mx-auto ${
        props.linkHeading === "" ? "hidden lg:inline-block" : "inline-block"
      }`}
    >
      <h4 className="font-semibold text-lg">{props.linkHeading}</h4>
      <ul>
        {props.links.map((link) => {
          const linkLowerCase = link.toLowerCase();
          const linkSlug = linkLowerCase.replace(/ /g, "-");
          return (
            <li className="mt-3 font-light">
              {props.isInnerLink ? (
                <a href={linkHeadingSlug + "/" + linkSlug}>{link}</a>
              ) : (
                <a href={linkSlug}>{link}</a>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default FooterLinks;
