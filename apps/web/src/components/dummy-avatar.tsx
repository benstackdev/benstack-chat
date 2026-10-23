import { Avatar, AvatarFallback } from "./ui/avatar";

export function DummyAvatar({ initial }: { initial: string; }) {
  return (
    <Avatar>
      <AvatarFallback>
        {initial}
      </AvatarFallback>
    </Avatar>
  );
}