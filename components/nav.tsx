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
import { UserButton } from "@clerk/nextjs"

export const MainNav = () => {
  return (
    <div className="flex items-center justify-between w-full px-4 py-4">
      <span className="text-2xl font-bold">Logo</span>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/upload" className={navigationMenuTriggerStyle()}>
              Upload
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
