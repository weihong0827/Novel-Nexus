'use client'
import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { UserButton, currentUser } from "@clerk/nextjs"
import { User } from "prisma/prisma-client"
import { Flame } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Info } from 'lucide-react';


export interface MainNavProps {
  user: User
}


export const MainNav: React.FC<MainNavProps> = ({ user }) => {
  return (
    <div className="flex items-center justify-between  w-full px-4 py-4">
      <Link className="text-2xl font-bold" href="/">NOVEL NEXUS</Link>
      <NavigationMenu>
        <NavigationMenuList>

          {user &&
            <NavigationMenuItem>
              <div className={navigationMenuTriggerStyle()}>
                <Flame size={24} />
                <span className="ml-2 text-md">
                  {user.credits} Seeds
                  <TooltipProvider >
                    <Tooltip>
                      <TooltipTrigger className="ml-2"><Info size={12} /></TooltipTrigger>
                      <TooltipContent>
                        <p className="w-64 text-justify p-4">
                          Seeds empower you to borrow books from others, expanding your knowledge. Likewise, earn Seeds by lending your books.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                </span>
              </div>

            </NavigationMenuItem>
          }
          <NavigationMenuItem>
            <Link href="/" className={navigationMenuTriggerStyle()}>
              Home
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/my-listings" className={navigationMenuTriggerStyle()}>
              My Listings
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/my-requests" className={navigationMenuTriggerStyle()}>
              My Requests
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <div className={navigationMenuTriggerStyle()}>
              <UserButton />
            </div>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu >
    </div>
  )
}
