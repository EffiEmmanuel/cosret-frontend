import ValueCard from "../ValueCard";
import effi from "../../../public/images/effi.jpg";

export default function DashboardHome() {
  return (
    <>
      {/* LATEST ACTIVITY */}
      <section className="mt-20">
        <h1 className="text-xl font-bold ">Recent Projects</h1>

        <div className="flex flex-wrap gap-10">
          <ValueCard
            image={effi}
            title="Babcock UMIS"
            description="This project is for Babcock's university management system."
          />
          <ValueCard
            image={effi}
            title="BluPay Finance"
            description="This project is for Babcock's university management system."
          />
        </div>
      </section>
    </>
  );
}
