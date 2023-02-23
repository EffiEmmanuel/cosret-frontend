import FAQs from "./FAQs";

function FAQSection() {
  return (
    <section className="w-full my-32 text-center px-10 lg:px-0">
      <h2 className="text-4xl font-bold text-black">Got Questions?</h2>
      <p className="mt-5">
        Here are answers to questions we thought you might have 🤗
      </p>

      {/* FAQs */}
      <FAQs />
    </section>
  );
}

export default FAQSection;
