import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { signUpValidation } from "@/zod/sign-up-validation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useNavigate } from "react-router";

export function Signup() {
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm<z.infer<typeof signUpValidation>>({
    resolver: zodResolver(signUpValidation),
    mode: "onSubmit",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: ""
    }
  });

  const onSubmit = handleSubmit(async (formData) => {
    const { data, error } = await authClient.signUp.email({
      name: formData.name,
      email: formData.email,
      password: formData.password
    });

    if (error) {
      console.error(error);
      return;
    }

    navigate("/guest");
  });

  return (
    <div className={cn("flex justify-center")}>
      <Card className={cn("mt-4 flex-1 max-w-md")}>
        <CardHeader>
          <CardTitle>
            Create a new BenStack Chat Account
          </CardTitle>
          <CardDescription>
            Enter a username, email, and password below to sign up
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            id="sign-up"
            onSubmit={onSubmit}
            className={cn("flex flex-col gap-y-4")}>
            <Controller
              control={control}
              name="name"
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel aria-invalid={fieldState.invalid} htmlFor={field.name}>
                    Name/Alias
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    name={field.name}
                    aria-invalid={fieldState.invalid}
                    required
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              control={control}
              name="email"
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel aria-invalid={fieldState.invalid} htmlFor={field.name}>
                    Email
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    name={field.name}
                    type="email"
                    aria-invalid={fieldState.invalid}
                    required
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel aria-invalid={fieldState.invalid} htmlFor={field.name}>
                    Password
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    name={field.name}
                    type="password"
                    aria-invalid={fieldState.invalid}
                    required
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              control={control}
              name="passwordConfirm"
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel aria-invalid={fieldState.invalid} htmlFor={field.name}>
                    Confirm Password
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    name={field.name}
                    type="password"
                    aria-invalid={fieldState.invalid}
                    required
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </form>
        </CardContent>
        <CardFooter>
          <Button form="sign-up" type="submit">
            Sign Up
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}