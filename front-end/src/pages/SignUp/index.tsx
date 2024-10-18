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

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
  username: z.string().min(3),
});

export const SignUp = memo(() => {
  const navigate = useNavigate();
  const { register } = useAuthSession();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  const onSubmit = useCallback(
    async (values: z.infer<typeof registerSchema>) => {
      if (!register) {
        return;
      }

      try {
        const response = await register(values);
        if (
          response?.user.role === "admin" ||
          response?.user.role === "superAdmin"
        ) {
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
    []
  );

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <Form {...form}>
        <Card className="space-y-2 w-[400px]">
          <CardHeader>
            <CardTitle>Sign up</CardTitle>
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
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="heisenberg" {...field} />
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
                  Already have an account?{" "}
                  <a className="text-cyan-400" href="/login">
                    Log in
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
