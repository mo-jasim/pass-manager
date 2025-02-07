"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import toast from "react-hot-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { addPasswordServer } from "../../actions/actions";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  website: z.string()
      .min(3, {
          message: "Website must be at least 3 characters."
      })
      .max(30, {
          message: "Website cannot exceed 30 characters."
      }),
  username: z.string()
      .min(4, {
          message: "Username must be at least 4 characters."
      })
      .max(30, {
          message: "Username cannot exceed 30 characters."
      })
      .regex(/^[a-zA-Z0-9_]+$/, {
          message: "Username can only contain letters, numbers, and underscores."
      }),
  password: z.string()
      .min(8, {
          message: "Password must be at least 8 characters."
      })
      .max(64, {
          message: "Password cannot exceed 64 characters."
      })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
          message: "Password must include lowercase, uppercase, number, and special character."
      })
});

export function AddPasswords() {
  const router = useRouter();
  const user = useUser();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      website: "",
      username: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (user.user) {
      addPasswordServer(
        values.website,
        values.username,
        values.password,
        user?.user?.id
      );
      toast.success("Password Added Successfully");
      router.refresh();
      form.reset();
    }
  }

  return (
    <Card>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 py-5 px-6"
        >
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website URL</FormLabel>
                <FormControl>
                  <Input placeholder="Enter web url..." {...field} />
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
                <FormLabel>UserName or Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Username or email" {...field} />
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
                  <Input placeholder="Enter Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" className="w-full">
            Add Password
          </Button>
        </form>
      </Form>
    </Card>
  );
}
