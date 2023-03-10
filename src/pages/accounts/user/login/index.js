import Head from "next/head";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import Layout from "@/components/Layout";
import HeadingAndSubtext from "@/components/HeadingAndSubtext";
import ContactForm from "@/forms/ContactForm";
import UserLoginForm from "@/forms/UserLoginForm";

export default function Login() {
  return (
    <>
      <Head>
        <title>Cosret | Log in to your account.</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        {/* HERO SECTION */}

        <section className="w-full text-center my-20 mb-72">
          <HeadingAndSubtext
            heading="Log in as user"
            subtext="Sign in to your account."
          />
          {/* CONTACT US FORM */}
          <div className="mt-16">
            <UserLoginForm />
          </div>
        </section>

        <div></div>

        {/* FOOTER */}
        <Footer />
      </Layout>
    </>
  );
}
