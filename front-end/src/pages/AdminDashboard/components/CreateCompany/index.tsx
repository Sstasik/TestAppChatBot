import { api } from "@/api";
import { useLocalStorage } from "@/shared/hooks/useLocalStorage";
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
import { useQueryClient } from "@tanstack/react-query";
import { memo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const createCompanySchema = z.object({
  name: z.string().min(3),
});

export const CreateCompany = memo(() => {
  const queryClient = useQueryClient();
  const [selectedCompanyId, setSelectedCompanyId] = useLocalStorage<
    string | null
  >("selected_company_id", null);

  const form = useForm<z.infer<typeof createCompanySchema>>({
    resolver: zodResolver(createCompanySchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = useCallback(
    async (values: z.infer<typeof createCompanySchema>) => {
      try {
        const response = await api.companies.createCompany(values);
        queryClient.invalidateQueries({ queryKey: ["admin", "companies"] });
        setSelectedCompanyId(response._id);
        toast.success("Company created!");
      } catch (error) {
        toast.error("Error while creating company");
      }
    },
    [setSelectedCompanyId, queryClient]
  );

  return (
    <Form {...form}>
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Company</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 w-full"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What is your's company name?</FormLabel>
                  <FormControl>
                    <Input
                      type="name"
                      placeholder="Los Pollos Hermanos"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              Continue
            </Button>
          </form>
        </CardContent>
      </Card>
    </Form>
  );
});
