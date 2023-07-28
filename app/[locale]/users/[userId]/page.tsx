import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import ClientOnly from "@/app/[locale]/components/ClientOnly";
import EmptyState from "@/app/[locale]/components/EmptyState";
import UserClient from "./UserClient";
import getReservations from "@/app/actions/getReservations";
import getUserById from "@/app/actions/getUserById";

interface IParams {
  userId?: string;
}

const UserPage = async ({ params }: { params: IParams }) => {
  const user = await getUserById(params);
  const currentUser = await getCurrentUser();

  if (!user) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <UserClient user={user} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default UserPage;