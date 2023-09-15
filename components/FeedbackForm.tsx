'use client';

import { createFeedback } from '@/lib/actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import * as z from 'zod';
import ToastBody from './ToastBody';
import { Button } from './ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { Textarea } from './ui/textarea';

const formSchema = z.object({
  content: z.string().max(1000).nonempty('Feedback is required.'),
});

interface FeedbackFormProps {
  onOpenChange?: (value: boolean) => void;
}
const FeedbackForm: FC<FeedbackFormProps> = ({ onOpenChange }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: '',
    },
  });
  const { isValid } = form.formState;

  const handleClose = () => {
    onOpenChange?.(false);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { success, message } = await createFeedback(values);
    if (success) {
      toast.success(
        <ToastBody title="Success" message="Feedback created. Thank you!" />
      );
      form.reset();
      handleClose();
    } else {
      toast.error(
        <ToastBody title="Error" message="Feedback creation failed." />
      );
    }
  }
  return (
    <div className="flex flex-col gap-3">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3"
        >
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    className="min-w-[240px] bg-background"
                    placeholder="Enter any feedback..."
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={!isValid} className="m-0">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default FeedbackForm;
