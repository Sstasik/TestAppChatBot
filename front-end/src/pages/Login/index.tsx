import { useAuthSession } from "@/providers/AuthProvider";
import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/form";
import { Input } from "@/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { memo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const Login = memo(() => {
  const navigate = useNavigate();
  const { login } = useAuthSession();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      // USER CREDS
      // email: "valentyn@gmail.com",
      // password: "1111Aaaa!",
      // ADMIN CREDS
      email: "admin@gmail.com",
      password: "1111Aaaa!",
    },
  });

  const onSubmit = useCallback(
    async (values: z.infer<typeof loginSchema>) => {
      if (!login) {
        return;
      }

      try {
        const response = await login(values);

        if (
          response?.user.role === "admin" ||
          response?.user.role === "superAdmin"
        ) {
          console.log("test");

          navigate("/admin");
        }

        if (response?.user.role === "user") {
          navigate("/");
        }
      } catch (e) {
        const error = e as Error;
        toast.error(error.message);
      }
    },
    [login, navigate]
  );

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <Form {...form}>
        <Card className="space-y-2 w-[400px]">
          <CardHeader>
            <CardTitle>Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="walterwhite@gmail.com"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Password"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col items-center gap-4">
                <Button className="w-full" type="submit">
                  Continue
                </Button>
                <span className="text-sm">
                  Doesn't have an account yet?{" "}
                  <a className="text-cyan-400" href="/sign-up">
                    Register
                  </a>
                </span>
              </div>
            </form>
          </CardContent>
        </Card>
      </Form>
    </div>
  );
});
