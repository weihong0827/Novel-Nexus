'use client'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"

import { ExchangeDetails, myBorrowRequests, myLendRequests } from "@/lib/exchange";
import { cancelExchange, deleteExchange, acceptExchange, declineExchange, completeExchange } from "@/lib/exchange";
import { ExchangeStatus } from "@prisma/client";
interface exchangeTableProps {
  exchanges: ExchangeDetails;
  isOwner: boolean;
}

const formattedDate = (date: Date) => {
  const newDate = new Date(date)
  const dateString = newDate.toDateString()
  return dateString;
}
interface ActionSetProps {
  status: ExchangeStatus
  isOwner: boolean
  exchangeId: number
}

interface ActionButtonProps {
  exchangeId: number;
}

//TODO: Can be refactored to use a single button component

const RequesterActionSet: React.FC<ActionButtonProps> = ({ exchangeId }) => {
  return (
    <div className="flex gap-4">
      <Button variant={'destructive'} onClick={() => cancelExchange(exchangeId)}>Cancel</Button>
    </div>
  );
};

const OwnerApproveRequest: React.FC<ActionButtonProps> = ({ exchangeId }) => {
  return (
    <div className="flex gap-4">
      <Button variant={'destructive'} onClick={() => { declineExchange(exchangeId) }}>Reject</Button>
      <Button onClick={() => { acceptExchange(exchangeId) }}>Accept</Button>
    </div>
  );
};

const OwnerCompleteRequest: React.FC<ActionButtonProps> = ({ exchangeId }) => {
  return (
    <div className="flex gap-4">
      <Button onClick={() => { completeExchange(exchangeId) }}>Complete</Button>
    </div>
  );
};

const DeleteButton: React.FC<ActionButtonProps> = ({ exchangeId }) => {
  return (
    <Button variant={'destructive'} onClick={() => deleteExchange(exchangeId)}>Delete</Button>
  );
};


const ActionSet: React.FC<ActionSetProps> = ({ isOwner, status, exchangeId }) => {
  // Owner Logic
  if (isOwner) {
    switch (status) {
      case ExchangeStatus.REQUESTED:
        return <OwnerApproveRequest exchangeId={exchangeId} />;
      case ExchangeStatus.ACCEPTED:
        return <OwnerCompleteRequest exchangeId={exchangeId} />;
      default:
        return <DeleteButton exchangeId={exchangeId} />;
    }
  } else {
    // Requester Logic
    switch (status) {
      case ExchangeStatus.REQUESTED:
        return <RequesterActionSet exchangeId={exchangeId} />;
      case ExchangeStatus.CANCELLED:
      case ExchangeStatus.COMPLETED:
        return <DeleteButton exchangeId={exchangeId} />;
      default:
        return <>N/A</>;
    }
  }
};
export const ExchangeTable = ({ exchanges, isOwner }: exchangeTableProps) => {
  return (
    <Table>
      <TableCaption>A list of book exchanges</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Book ID</TableHead>
          <TableHead>{isOwner ? "Requester" : "Owner"}</TableHead>
          <TableHead>Message</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {exchanges.map((exchange) => (
          <TableRow key={exchange.id}>
            <TableCell>{exchange.id}</TableCell>
            <TableCell>{exchange.book.title}</TableCell>
            <TableCell>{isOwner ? exchange.requester.name : exchange.owner.name}</TableCell>
            <TableCell>{exchange.RequesterMessage || "N/A"}</TableCell>
            <TableCell>{exchange.status}</TableCell>
            <TableCell>{formattedDate(exchange.createdAt)}</TableCell>
            <TableCell><ActionSet exchangeId={exchange.id} status={exchange.status} isOwner={isOwner} /></TableCell>
          </TableRow>
        ))}
      </TableBody>
      {/* TableFooter is optional and can be omitted if not needed */}
    </Table>
  )
}
