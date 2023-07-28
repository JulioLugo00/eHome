import ClientOnly from "@/app/[locale]/components/ClientOnly";
import Banner from "./Banner";
import getCurrentUser from "@/app/actions/getCurrentUser";


const JoinPage = async () => {

  const currentUser = await getCurrentUser();

  return (
    <ClientOnly>
      <Banner currentUser={currentUser}/>
    </ClientOnly>
  );
};

export default JoinPage;