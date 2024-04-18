import { getBorrowRequests, getLendRequests, myBorrowRequests, myLendRequests } from "@/lib/exchange";
import { ExchangeTable } from "@/components/exchangeRequest/exchangeTable";


import { TypographyH1 } from "@/components/Typography/h1";



export default async function MyRequests() {
  const borrowRequests = await getBorrowRequests()
  const lendRequests = await getLendRequests()

  console.log(borrowRequests)
  console.log(lendRequests)
  return (
    <div className="flex flex-col gap-10">
      {/* TODO : Filter sorting, pagination */}
      <TypographyH1>My Borrow Requests</TypographyH1>

      <ExchangeTable exchanges={borrowRequests} isOwner={false} />
      <TypographyH1>My Lending Requests</TypographyH1>
      <ExchangeTable exchanges={lendRequests} isOwner={true} />
    </div>
  );
}

