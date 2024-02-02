import prisma from "@/app/libs/prismadb";

const getReviewsById = async (
  listingId: string
) => {
  try {

    const reviews = await prisma.review.findMany({
      where: {
        listingId: listingId
      },
    });

    return reviews;
  } catch (error: any) {
    console.log(error, 'SERVER_ERROR')
    return null;
  }
};

export default getReviewsById;