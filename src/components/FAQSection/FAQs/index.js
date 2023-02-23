import FaqItem from "../FaqItem";

function FAQs() {
  return (
    <div className="mt-10">
      <FaqItem
        question="What is COSRET"
        answer="COSRET a web application developed for our final year project. The term COSRET is a short form for Collaboratve Software Requirement Engineering Tool."
      />

      <FaqItem
        question="How Does COSRET work"
        answer="Here at COSRET, we have seasoned requirement engineers who work tirelessly with our users, YOU. When a new project is created, we assign a requirement engineer to you based on your project type. This requirement engineer takes your user requirements provided and works on them in order to provide the system requirements. COSRET is designed to provide you with a back and forth interaction between you and your assigned requirement engineer through out the process, targeted to give you the best services possible."
      />

      <FaqItem
        question="Is COSRET free to use"
        answer="For now, COSRET is absolutely free to use!"
      />

      {/* <FaqItem
        question="How many percentage does COSRET charge for its services"
        answer="Just another answer"
      /> */}

      <FaqItem
        question="Can I download my final requirement document"
        answer="Yes, you can. Currently, we provide only pdf download option."
      />

      <FaqItem
        question="Can I sign up as a requirement engineer"
        answer="Yes, you can! Once you apply, our team would go through your application and let you know if youare a good fit for us."
      />

      {/* <FaqItem question="Who can use BluPay" answer="Just another answer" />

      <FaqItem
        question="What are the available payout options"
        answer="Just another answer"
      />

      <FaqItem
        question="I am a developer, how can I integrate BluPay in my personal projects?"
        answer="Just another answer"
      /> */}
    </div>
  );
}

export default FAQs;
