import Head from "next/head";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import Layout from "@/components/Layout";
import HeadingAndSubtext from "@/components/HeadingAndSubtext";
import ContactForm from "@/forms/ContactForm";
import Link from "next/link";

export default function Login() {
  return (
    <>
      <Head>
        <title>Cosret | Log in options</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        {/* HERO SECTION */}

        <section className="w-full text-center my-20 min-h-screen">
          <HeadingAndSubtext
            heading="Choose Option"
            subtext="Select your account type to log in"
          />
          {/* CONTACT US FORM */}
          <div className="mt-16">
            <Link
              href="/accounts/user/login"
              className="h-16 w-48 mx-auto mt-12 rounded-lg flex justify-center align-middle text-white my-5 py-3 px-7 bg-black"
            >
              <span className="my-auto">User</span>
            </Link>
            <Link
              href="/accounts/engineer/login"
              className="h-16 w-48 mx-auto rounded-lg flex justify-center align-middle text-black my-5 py-3 px-7 bg-transparent border-black border-2"
            >
              <span className="my-auto">Engineer</span>
            </Link>
          </div>
        </section>

        <div></div>

        {/* FOOTER */}
        <Footer />
      </Layout>
    </>
  );
}
