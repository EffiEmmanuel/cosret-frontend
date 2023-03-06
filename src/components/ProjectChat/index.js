import { FaPaperPlane, FaPlaneDeparture } from "react-icons/fa";

export default function ProjectChat(props) {
  // Connect to Web Socket here to enable chat functionality
  return (
    <>
      {/* OVERVIEW */}
      <div className="border-[.5px] p-7 h-[600px] max-w-lg lg:max-w-2xl relative rounded-lg">
        <div className="border-b-[.5px] pb-3">
          <h1 className="text-xl font-bold">Engineer Kowokpe</h1>
          <div className="flex gap-1">
            <div className="h-[5px] w-[5px] my-auto bg-green-400 rounded-full"></div>
            <p className="text-xs my-auto mt-[1.5px]">Active now</p>
          </div>
          {/* <div className="flex gap-1">
            <div className="h-[5px] w-[5px] my-auto bg-gray-400 rounded-full"></div>
            <p className="text-xs my-auto mt-[1.5px]">Offline</p>
          </div> */}
        </div>

        {/* OTHER DETAILS ABOUT PROJECT */}
        <div className="mt-10">
          <h2 className="text-lg font-semibold">
            {props?.project?.engineerAssigned}
          </h2>
          {/* CHAT MESSAGES */}
          <div className="-mt-10 flex flex-col justify-start h-[473px] overflow-y-scroll chat-scroll">
            {/* ENGINEER MESSAGE */}
            <div className="w-full flex justify-start">
              <p className="space-y-48 text-sm p-3 shadow-lg text-white rounded-lg my-5 max-w-[43%] bg-[#181818] h-auto text-left">
                Hi, I am still working on your project.
              </p>
            </div>

            {/* USER MESSAGE */}
            <div className="w-full flex justify-end">
              <p className="space-y-48 text-left text-sm p-3 text-white rounded-lg my-5 max-w-[43%] shadow-lg bg-green-500 h-auto ">
                Okay, thanks for letting me know!
              </p>
            </div>
          </div>

          <form className="absolute bottom-4 left-0 right-0 mx-7">
            <div className="flex h-12 align-middle border-[.5px] px-4">
              <input
                type="text"
                name="message"
                className="w-full h-full border-gray-400  px-8 text-black text-sm rounded-lg rounded-bl-lg focus:outline-none"
              />
              <button type="submit">
                <FaPaperPlane className="text-lg my-auto self-center" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
