import ContactForm from "@/forms/ContactForm";
import HeadingAndSubtext from "../HeadingAndSubtext";

function ReachOutToUs() {
  return (
    <section className="w-full text-center my-28 mb-80">
      <HeadingAndSubtext
        heading="Reach out to us"
        subtext="We typically reply in less than 5 minutes"
      />
      {/* CONTACT US FORM */}
      <div className="mt-16">
        <ContactForm />
      </div>
    </section>
  );
}

export default ReachOutToUs;
