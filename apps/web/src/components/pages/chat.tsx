import { authClient } from "@/lib/auth-client";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { ChatLoading } from "./chat-loading";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { messageValidation } from "@/zod/message-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldLabel } from "../ui/field";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";
import type { messageDisplayValidation } from "@/zod/message-display";
import { ChatMessage } from "../chat-message";

type MessageDisplayType = z.infer<typeof messageDisplayValidation>;

export function Chat() {
  const {
    data: session,
    isPending
  } = authClient.useSession();

  const wsRef = useRef<WebSocket | null>(null);
  const [messages, setMessages] = useState<MessageDisplayType[]>([]);

  const { control, handleSubmit, reset } = useForm<z.infer<typeof messageValidation>>({
    resolver: zodResolver(messageValidation),
    mode: "onSubmit",
    defaultValues: {
      content: ""
    }
  });

  const onSubmit = handleSubmit(async (formData) => {
    // Web socket stuff???
    sendMessage(session?.user.name!, formData.content);
    reset();
  });

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080/ws");

    socket.onopen = () => {
      console.log("Socket opened (client)");
    };

    socket.onmessage = (event) => {
      setMessages((prev) => [...prev, JSON.parse(event.data)]);
    };

    socket.onerror = (error) => {
      console.error("WebSocket error (client): ", error);
    };

    wsRef.current = socket;

    return () => {
      socket.close(1000, "WebSocket unmounted");
    };
  }, []);

  const sendMessage = useCallback((username: string, content: string) => {
    wsRef.current?.send(JSON.stringify({ username, content }));
  }, []);

  if (isPending)
    return <ChatLoading />;

  return (
    <Card className={cn("mx-auto max-w-xl")}>
      <CardHeader>
        <CardTitle>Welcome {session?.user.name}!</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Messages go here */}
        <div className="flex flex-col gap-y-4">
          {messages.map(
            (msg, idx) =>
              <ChatMessage key={`${msg.username}-${idx}`} username={msg.username} content={msg.content} alignEnd={msg.username === session?.user.name} />
          )}
        </div>
      </CardContent>
      <CardFooter>
        {/* Message box */}
        <form
          onSubmit={onSubmit}
          className={cn("flex flex-col gap-y-2 flex-1")}
        >
          <Controller
            control={control}
            name="content"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel
                  aria-invalid={fieldState.invalid}
                  htmlFor={field.name}
                >
                  Message
                </FieldLabel>
                <Textarea
                  {...field}
                  className="min-w-md"
                  id={field.name}
                  name={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Type your message here."
                  required />
              </Field>
            )}
          />
          <Button className={cn("max-w-fit")} type="submit">
            Send Message
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}