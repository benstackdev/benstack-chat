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
import { Message, MessageAvatar, MessageContent } from "../ui/message";
import { DummyAvatar } from "../dummy-avatar";
import { DummyBubble } from "../dummy-bubble";

export function Chat() {
  const {
    data: session,
    isPending,
    error,
    refetch
  } = authClient.useSession();

  const { control, handleSubmit, reset } = useForm<z.infer<typeof messageValidation>>({
    resolver: zodResolver(messageValidation),
    mode: "onSubmit",
    defaultValues: {
      content: ""
    }
  });

  const onSubmit = handleSubmit(async (formData) => {
    // Web socket stuff???
    reset();
    console.log(formData);
  });

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
          <Message align="end">
            <MessageAvatar>
              <DummyAvatar initial="T" />
            </MessageAvatar>
            <MessageContent>
              <DummyBubble msg="Hello World!" />
            </MessageContent>
          </Message>
          <Message>
            <MessageAvatar>
              <DummyAvatar initial="S" />
            </MessageAvatar>
            <MessageContent>
              <DummyBubble msg="Welcome to BenStack Chat! This is a longer test message" />
            </MessageContent>
          </Message>
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