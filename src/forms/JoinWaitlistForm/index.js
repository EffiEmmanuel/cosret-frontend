function JoinWaitlistForm() {
  return (
    <form className="">
      <div className="flex flex-col md:flex-row md:max-w-2xl mx-auto w-full justify-center">
        <div className="w-3/4 mx-auto md:mx-0 md:w-2/4">
          <input
            className="w-full h-16 px-8 text-black text-sm rounded-lg md:rounded-tr-none md:rounded-br-none focus:outline-none"
            id="email"
            type="email"
            name="email"
            placeholder="abc@example.com"
          />
        </div>
        <button
          type="submit"
          className="bg-black mx-auto md:mx-0 mt-4 md:mt-0 h-16 w-44 px-4 rounded-lg md:rounded-tl-none md:rounded-bl-none text-sm hover:bg-gray-700 hover:border-black"
        >
          Join Waitlist
        </button>
      </div>
    </form>
  );
}

export default JoinWaitlistForm;
