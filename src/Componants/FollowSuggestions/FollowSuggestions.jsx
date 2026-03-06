import axios from "axios";
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { authcontext } from "../../context/Authcontext";
import Skeletonn from "../Skeleton/Skeleton";
import { Image } from "@heroui/react";

export default function FollowSuggestions() {
  const { token } = useContext(authcontext);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["suggestedFriends"],
    queryFn: getSuggestions,
    enabled: !!token,
    select: (res) =>  res.data.data.suggestions
  });
  function getSuggestions() {
    return axios.get(
      `${import.meta.env.VITE_API_URL}users/suggestions?limit=10`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }

  if (isLoading) {
    return <Skeletonn page={5} />;
  }

  if (isError) {
    return (
      <p className="text-center text-red-500 mt-4">
        {error.message}
      </p>
    );
  }

  return (
    <div className="bg-white text-gray-800 dark:bg-gray-700 dark:text-gray-200 shadow rounded-xl p-4   ">
      <h2 className="font-bold text-lg mb-3">Suggested Friends</h2>

      <div className="space-y-3">
        {data ?.map((user) => (
          <div
            key={user._id}
            className="flex items-center justify-between  border-b border-gray-200 py-2"
          >

            <div className="flex items-center gap-3">
              <Image
                src={user.photo}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-medium">{user.name}</p>  
                <p className="text-sm text-gray-500">@{user.name}</p>       
                      <p className="text-xs text-gray-500"> Followers {user.followersCount}</p> 

              </div>
            </div>

            <button className="px-3 py-1 text-sm bg-primary dark:bg-gray-300 dark:text-gray-800 rounded-lg hover:bg-blue-600">
              Follow
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}