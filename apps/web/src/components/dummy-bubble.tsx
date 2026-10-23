import { cn } from "@/lib/utils";
import { Bubble, BubbleContent } from "./ui/bubble";

export function DummyBubble({ msg }: { msg: string; }) {
  return (
    <Bubble>
      <BubbleContent className={cn("rounded-lg")}>
        {msg}
      </BubbleContent>
    </Bubble>
  );
}