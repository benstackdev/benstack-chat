import type { messageDisplayValidation } from "@/zod/message-display";
import { Message, MessageAvatar, MessageContent } from "./ui/message";
import * as z from "zod";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Bubble, BubbleContent } from "./ui/bubble";

type ChatMessageProps = z.infer<typeof messageDisplayValidation> &
{
  alignEnd: boolean;
};

export function ChatMessage({ username, content, alignEnd }: ChatMessageProps) {
  return (
    <Message className="flex gap-x-3" align={alignEnd ? "end" : "start"}>
      <MessageAvatar>
        <Avatar>
          <AvatarFallback>{username.charAt(0)}</AvatarFallback>
        </Avatar>
      </MessageAvatar>
      <MessageContent>
        <Bubble>
          <BubbleContent className="rounded-xl px-3">
            {content}
          </BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
  );
}