import { FaPencilAlt, FaPlus, FaTrash, FaTrashAlt } from "react-icons/fa";

export default function SystemRequirements(props) {
  return (
    <>
      {/* OVERVIEW */}
      <div>
        <div className="flex justify-between lg:justify-start lg:gap-x-10 border-b-[.5px] pb-3">
          <h1 className="text-xl font-bold my-auto">System Requirements</h1>
          <button className="text-sm my-auto flex gap-2 border-gray-400 border-[.5px] border-dotted p-2">
            <span className="my-auto">Add new</span>
            <FaPlus className="my-auto" />
          </button>
        </div>
        {/* OTHER DETAILS ABOUT PROJECT */}
        <div className="mt-10">
          {/* RequirementCard */}
          <div className="w-full overflow-x-scroll scrollbar">
            <div className="flex justify-between">
              <span className="text-xs text-gray-400 uppercase">
                Requirement
              </span>
              <span className="text-xs text-gray-400 uppercase">
                Date Created
              </span>
              <span className="text-xs text-gray-400 uppercase">Source</span>
              <span className="text-xs text-gray-400 uppercase">Actions</span>
            </div>

            <ol className="mt-4">
              {props?.userRequirements?.map((userRequirement) => (
                <li key={userRequirement._id} className="flex justify-between">
                  <span className="text-sm max-w-lg">
                    {userRequirement.requirement}
                  </span>
                  <span className="text-sm max-w-md">
                    {userRequirement.createdAt}
                  </span>
                  <span className="text-sm max-w-md">
                    {userRequirement.source}
                  </span>
                  <span className="text-sm max-w-md">
                    <button>
                      <FaPencilAlt />
                    </button>
                    <button>
                      <FaTrashAlt />
                    </button>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </>
  );
}
