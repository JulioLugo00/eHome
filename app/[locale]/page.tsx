import getCurrentUser from "../actions/getCurrentUser";
import getListings, { IListingsParams } from "../actions/getListings";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import GMap from "./components/GMap";
import GMapListings from "./components/GMapListings";
import ListingCard from "./components/listings/ListingCard";

interface HomeProps{
  searchParams: IListingsParams;
}

const Home = async({searchParams} : HomeProps) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  
  if(listings.length == 0){
    return(
      <ClientOnly>
        <EmptyState showReset/>
      </ClientOnly>
    )
  }
  

  return (
    <ClientOnly>
      <Container>
        <div className="pt-24 flex ">
  
          {/* Columna para ListingCards */}
          <div className="
            flex-1
            overflow-auto
            pr-4
          ">
            <div className="
              grid
              grid-cols-1
              sm:grid-cols-2
              md:grid-cols-3
              lg:grid-cols-4
              xl:grid-cols-5
              2xl:grid-cols-6
              gap-8
            ">
              {listings.map((listing) => (
                <ListingCard 
                  currentUser={currentUser}
                  key={listing.id}
                  data={listing}
                />
              ))}
            </div>
          </div>
  
         {/* Columna para GMapListings */}
        <div className="hidden md:block w-1/3  right-0 top-0 h-full" style={{ width: '30%', position: 'fixed', right: 0, top: 0, bottom: 0, overflowY: 'auto' }}>
          {searchParams.cityGMap && 
            <GMapListings 
              listings={listings} 
              center={[listings[0].latitude, listings[0].longitude]}
            />
          }
        </div>

  
        </div>
      </Container>
    </ClientOnly>
  )
}


export default Home;
