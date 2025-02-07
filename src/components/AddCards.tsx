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
import { addCardServer } from "../../actions/actions";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  cardName: z.string().min(5, {
    message: "Card Holder Name must be at least 5 characters.",
  }),

  cardNumber: z
    .string()
    .min(16, {
      message: "Card Number must be at least 16 characters.",
    })
    .max(19, {
      message: "Card Number must be at most 19 characters.",
    })
    .regex(/^\d+$/, {
      message: "Card Number must be a numbers only.",
    }),
    
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, {
    message: "Expiry Date must be in the format MM/YY.",
  }),
  cvv: z
  .string()
  .min(3, { message: "CVV must be exactly 3 digits." })
  .max(3, { message: "CVV must be exactly 3 digits." })
  .regex(/^\d{3}$/, { message: "CVV must contain only numbers." })
  .transform((val) => Number(val)),
});

export function AddCards() {
  const user = useUser();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: 0,
    },
  });
  const router = useRouter();

  function onSubmit(values: z.infer<typeof formSchema>) {

    if(user.user){
      addCardServer(values.cardName, values.cardNumber, values.expiryDate, values.cvv, user?.user?.id);
      toast.success("Card Added Successfully");
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
            name="cardName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Card Holder Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Card Holder Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
         
          <FormField
            control={form.control}
            name="cardNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Card Number</FormLabel>
                <FormControl>
                  <Input placeholder="1234 5678 9012 3456" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="expiryDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expiry Date</FormLabel>
                  <FormControl>
                    <Input placeholder="MM/YY" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cvv"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CVV</FormLabel>
                  <FormControl>
                    <Input placeholder="123" {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full">
            Add Card
          </Button>
        </form>
      </Form>
    </Card>
  );
}
