import React from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import { FormValues } from "@/types/form";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Checkbox } from "./ui/checkbox";

interface PDFFormProps {
  form: UseFormReturn<FormValues>;
  onSubmit: (data: FormValues) => void;
  isSubmitting: boolean;
}

const PDFForm: React.FC<PDFFormProps> = ({ form, onSubmit, isSubmitting }) => {
  const isDisabled = form.formState.isSubmitting || !form.formState.isValid;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Date Field */}
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline" 
                        className={cn(
                          "w-full pl-3 text-left font-normal !mt-4",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Address Fields */}
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="addressLine1"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address Line 1</FormLabel>
                <FormControl>
                  <Input placeholder="123 Main St" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="addressLine2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address Line 2 (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Apt 4B" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="addressLine3"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address Line 3 (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="City, State ZIP" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Signature Field */}
        <FormField
          control={form.control}
          name="signature"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Signature</FormLabel>
              <FormControl>
                <Input
                  placeholder="Type your full name as signature"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Please type your full legal name as your signature.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email Field
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="your@email.com" {...field} />
              </FormControl>
              <FormDescription>
                We'll send a copy of your completed form to this email address.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <Controller
          control={form.control}
          name="agreement"
          rules={{ required: "You must acknowledge this statement" }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <FormItem>
              <div className="flex items-start space-x-2">
                <FormControl>
                  <Checkbox
                    checked={value}
                    onCheckedChange={onChange}
                    id="agreement"
                  />
                </FormControl>
                <FormLabel htmlFor="agreement" className="text-sm font-normal">
                  I understand that this letter is intended to be served to the
                  court and all parties.
                </FormLabel>
              </div>
              <FormMessage>{error?.message}</FormMessage>
            </FormItem>
          )}
        />

        {/* Acknowledgments */}
        <div className="space-y-4">
          <Controller
            control={form.control}
            name="oregonCitizen"
            rules={{ required: "You must confirm you are an Oregon Citizen" }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <FormItem>
                <div className="flex items-start space-x-2">
                  <FormControl>
                    <Checkbox
                      checked={value}
                      onCheckedChange={onChange}
                      id="oregonCitizen"
                    />
                  </FormControl>
                  <FormLabel htmlFor="oregonCitizen" className="text-sm font-normal">
                    I confirm that I am an Oregon Citizen
                  </FormLabel>
                </div>
                <FormMessage>{error?.message}</FormMessage>
              </FormItem>
            )}
          />

          <Controller
            control={form.control}
            name="burdenAcknowledgment"
            rules={{ required: "You must acknowledge this statement" }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <FormItem>
                <div className="flex items-start space-x-2">
                  <FormControl>
                    <Checkbox
                      checked={value}
                      onCheckedChange={onChange}
                      id="burdenAcknowledgment"
                    />
                  </FormControl>
                  <FormLabel htmlFor="burdenAcknowledgment" className="text-sm font-normal">
                    I understand that the burden of proof is on Christine Kotek
                  </FormLabel>
                </div>
                <FormMessage>{error?.message}</FormMessage>
              </FormItem>
            )}
          />

          <Controller
            control={form.control}
            name="issuesAcknowledgment"
            rules={{ required: "You must acknowledge this statement" }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <FormItem>
                <div className="flex items-start space-x-2">
                  <FormControl>
                    <Checkbox
                      checked={value}
                      onCheckedChange={onChange}
                      id="issuesAcknowledgment"
                    />
                  </FormControl>
                  <FormLabel htmlFor="issuesAcknowledgment" className="text-sm font-normal">
                    I understand that the issues of first impression need to be conclusively resolved
                  </FormLabel>
                </div>
                <FormMessage>{error?.message}</FormMessage>
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isDisabled}>
          {isSubmitting ? "Processing..." : "Generate and Submit PDF"}
        </Button>
      </form>
    </Form>
  );
};

export default PDFForm;
