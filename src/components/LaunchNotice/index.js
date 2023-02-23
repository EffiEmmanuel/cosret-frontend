import JoinWaitlistForm from "@/forms/JoinWaitlistForm";
import HeadingAndSubtext from "../HeadingAndSubtext";

function LaunchNotice() {
  return (
    <section className="w-full flex justify-center align-middle mt-60 doodleBg globally text-center lg:px-64 mb-40">
      <div className="my-auto lg:h-auto w-full lg:mx-auto doodleBgBlue text-white lg:rounded-xl py-20 px-5 lg:px-0">
        <HeadingAndSubtext
          heading="Be the first to know when we launch!"
          subtext="Join our waitlist today"
        />
        {/* JOIN WAITLIST */}
        <div className="mt-10">
          <JoinWaitlistForm />
        </div>
      </div>
    </section>
  );
}

export default LaunchNotice;
