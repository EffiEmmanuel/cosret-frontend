function ContactForm() {
  return (
    <form className="">
      <div className="px-20 lg:px-64">
        <div className="flex flex-col lg:flex-row justify-between gap-x-20 align-middle w-full">
          <div className="lg:w-1/2 w-full relative">
            <label
              htmlFor="fullname"
              className="uppercase text-sm absolute left-0"
            >
              Fullname:
            </label>
            <input
              className="w-full h-16 bg-cosretBlue-300 px-8 text-black text-sm mt-7 rounded-lg rounded-bl-lg focus:outline-none"
              id="fullname"
              type="fullname"
              name="fullname"
              placeholder="John Doe"
            />
          </div>
          <div className="lg:w-1/2 w-full relative mt-14 lg:mt-0">
            <label
              htmlFor="email"
              className="uppercase text-sm absolute left-0"
            >
              Email Address:
            </label>
            <input
              className="w-full h-16 bg-cosretBlue-300 px-8 text-black text-sm mt-7 rounded-lg rounded-bl-lg focus:outline-none"
              id="email"
              type="email"
              name="email"
              placeholder="abc@example.com"
            />
          </div>
        </div>

        <div className="w-full lg:mt-20 mt-14 relative">
          <label
            htmlFor="message"
            className="uppercase text-sm absolute left-0"
          >
            Message:
          </label>
          <textarea
            className="h-56 rounded-lg resize-none bg-cosretBlue-300 w-full p-8 mt-7 outline-none"
            placeholder="Write your message here..."
          ></textarea>
          <button
            type="submit"
            className="bg-black text-white h-16 w-44 px-8 rounded-lg absolute bottom-0 left-0 -mb-24 rounded-br-lg text-sm hover:bg-gray-700 hover:border-black"
          >
            Send
          </button>
        </div>
      </div>
    </form>
  );
}

export default ContactForm;
