import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Library,
  Search,
  Shirt,
  User,
  MonitorPlay,
  LayoutDashboard,
  BookOpen,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ModeToggle } from "./ModeToggle";
import LogoutButton from "./LogoutButton";
import { useServerUser } from "@/serverHooks/useServerUser";

const SIDEBAR_LINKS = [
  {
    icon: Search,
    label: "Discover",
    href: "/discover",
  },
  {
    icon: Library,
    label: "Library",
    href: "/Library",
  },
  {
    icon: Shirt,
    label: "Dashboard",
    href: "/secret-dashboard",
  },
];

const SIDEBAR_LINKS_CREATOR = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/secret-dashboard",
  },
  {
    icon: MonitorPlay,
    label: "Courses",
    href: "/Courses",
  },
  {
    icon: BookOpen,
    label: "eBook",
    href: "/ebooks",
  },
];

const Sidebar = async () => {
  const user = await useServerUser();
  return (
    <div
      className="flex lg:w-1/5 flex-col gap-3 px-2 border-r sticky
    left-0 top-0 h-screen"
    >
      <Link href="/update-profile" className="max-w-fit">
        <Avatar className="mt-4 cursor-pointer">
          <AvatarImage
            src={user?.image || "/user-placeholder.png"}
            className="object-cover"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </Link>

      <nav className="flex flex-col gap-3">
        {user?.isCreator &&
          SIDEBAR_LINKS_CREATOR.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex w-12 lg:w-full items-center gap-2 hover:bg-primary-foreground font-bold hover:text-primary px-2 py-1 rounded-full justify-center lg:justify-normal"
            >
              <link.icon className="w-6 h-6" />
              <span className="hidden lg:block">{link.label}</span>
            </Link>
          ))}

        {user?.isCreator &&
          SIDEBAR_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex w-12 lg:w-full items-center gap-2 hover:bg-primary-foreground font-bold hover:text-primary px-2 py-1 rounded-full justify-center lg:justify-normal"
            >
              <link.icon className="w-6 h-6" />
              <span className="hidden lg:block">{link.label}</span>
            </Link>
          ))}

        <DropdownMenu>
          <div className="flex w-12 lg:w-full items-center gap-2 hover:bg-primary-foreground font-bold hover:text-primary px-2 py-1 rounded-full justify-center lg:justify-normal">
            <DropdownMenuTrigger className="flex items-center gap-2">
              <User className="w-6 h-6" />
              <span className="hidden lg:block">Setting</span>
            </DropdownMenuTrigger>
          </div>

          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {/* <Link href={process.env.STRIPE_BILLING_PORTAL_LINK_DEV + "?prefilled_email=" + user?.email}>
							<DropdownMenuItem>Billing</DropdownMenuItem>
						</Link> */}
            <LogoutButton />
          </DropdownMenuContent>
        </DropdownMenu>

        <ModeToggle />
      </nav>
    </div>
  );
};
export default Sidebar;
