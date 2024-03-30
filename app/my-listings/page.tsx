import { getOwnListing } from "@/lib/book";
import { TypographyH1 } from "@/components/Typography/h1";
import { MyListingTable } from "@/components/my-listing-table";

export default async function MyListings() {
  const listings = await getOwnListing();
  return (
    <div className="flex flex-col gap-10">
      <TypographyH1>My Listings</TypographyH1>
      <MyListingTable books={listings} />
    </div>
  );
}
