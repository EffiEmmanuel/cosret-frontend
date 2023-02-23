import FigImageWithCaption from "../FigImageWithCaption";
import effi from "../../../public/images/effi.jpg";

function MeetTheTeam() {
  return (
    <section className="w-full mt-60 h-auto doodleBg lg:globally text-center py-20">
      <h2 className="text-4xl font-bold text-white">Meet the team</h2>

      {/* FLAGS */}
      <div className="flex flex-col lg:flex-row align-middle w-full justify-center gap-x-28 mt-20 lg:mt-28">
        <FigImageWithCaption
          image={effi}
          caption="Effi Emmanuel Nwachukwu"
          role="Team Lead / Fullstack Developer"
        />
        <FigImageWithCaption
          image={effi}
          caption="Esikabulu Daniel"
          role="UI/UX Designer"
        />
        <FigImageWithCaption
          image={effi}
          caption="Imuekheme Precious Adams"
          role="Frontend Developer"
        />
      </div>
    </section>
  );
}

export default MeetTheTeam;
