import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { adminSignInValidation } from "@/zod/sign-up-validation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useNavigate } from "react-router";

export function AdminSignIn() {
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm<z.infer<typeof adminSignInValidation>>({
    resolver: zodResolver(adminSignInValidation),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    }
  });

  const onSubmit = handleSubmit(async (formData) => {
    const { data, error } = await authClient.signIn.email({
      email: formData.email,
      password: formData.password
    });

    if (error) {
      console.error(error);
      return;
    }

    navigate("/admin");
  });

  return (
    <div className={cn("flex justify-center")}>
      <Card className={cn("mt-4 flex-1 max-w-md")}>
        <CardHeader>
          <CardTitle>
            Admin Sign In
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            id="admin-sign-in"
            onSubmit={onSubmit}
            className={cn("flex flex-col gap-y-4")}>
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
          </form>
        </CardContent>
        <CardFooter>
          <Button form="admin-sign-in" type="submit">
            Sign In
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}