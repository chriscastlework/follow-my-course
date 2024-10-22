import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface MenuProfileComponentProps {
  user: {
    image?: string;
    name?: string;
  } | null;
}

export default function MenuProfileComponent({
  user,
}: MenuProfileComponentProps) {
  return (
    <div className="flex items-center space-x-3">
      <Link href="/update-profile" className="max-w-fit">
        <Avatar className="cursor-pointer">
          <AvatarImage
            src={user?.image || "/user-placeholder.png"}
            alt={user?.name || "User"}
            className="object-cover"
          />
          <AvatarFallback>
            {user?.name ? user.name.substring(0, 2).toUpperCase() : "U"}
          </AvatarFallback>
        </Avatar>
      </Link>
      {user?.name && <div className="text-sm font-medium">{user.name}</div>}
    </div>
  );
}
