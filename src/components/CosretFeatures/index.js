const { default: FeatureShowcase } = require("../FeatureShowcase");

function CosretFeatures() {
  return (
    <section className="lg:mt-80 bg-white">
      <div className="px-14 md:px-30 lg:px-40 text-center">
        <FeatureShowcase
          firstLineText="Create and manage projects"
          secondLineText=""
          //   image={blupayPaymentGateway}
          subText="Create and manage all your projects right from your dashboard."
        />
        <FeatureShowcase
          isReversed={true}
          firstLineText="Submit User Requirements"
          secondLineText=""
          //   image={blupayWithdrawalPage}
          subText="Submit user requirements using our available requirement gathering methods."
        />
        <FeatureShowcase
          firstLineText="Stay Up-to-date"
          secondLineText=""
          //   image={blupayPaymentGateway}
          subText="Get notified when your system requirements are updated and or delivered."
        />
        <FeatureShowcase
          isReversed={true}
          firstLineText="Request changes"
          secondLineText=""
          //   image={blupayWithdrawalPage}
          subText="Not satisfied? Submit queries to specific system requirements."
        />
      </div>
    </section>
  );
}
export default CosretFeatures;
