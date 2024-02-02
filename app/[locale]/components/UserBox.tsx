import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import {  User } from "@prisma/client";

import Avatar from "./Avatar";
import LoadingModal from "./modals/LoadingModal";
import { SafeUser } from "@/app/types";
import AvatarChat from "./AvatarChat";

interface UserBoxProps {
  data: SafeUser
}

const UserBox: React.FC<UserBoxProps> = ({ 
  data
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
const user: User = {
  ...data,
  emailVerified: data.emailVerified ? new Date(data.emailVerified) : null,
  createdAt: new Date(data.createdAt), // Convert createdAt to Date type
  updatedAt: new Date(data.updatedAt), // Convert updatedAt to Date type
};



  const handleClick = useCallback(() => {
    setIsLoading(true);

    axios.post('/api/conversations', { userId: data.id })
    .then((data) => {
    router.push(`/conversations/${data.data.id}`);
    })
    .finally(() => setIsLoading(false));
  }, [data, router]);

  return (
    <>
      {isLoading && (
        <LoadingModal />
      )}
      <div
        onClick={handleClick}
        className="
          w-full 
          relative 
          flex 
          items-center 
          space-x-3 
          bg-white 
          p-3 
          hover:bg-neutral-100
          rounded-lg
          transition
          cursor-pointer
        "
      >
        <AvatarChat user={user} />
        <div className="min-w-0 flex-1">
          <div className="focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true" />
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm font-medium text-gray-900">
                {data.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
 
export default UserBox;