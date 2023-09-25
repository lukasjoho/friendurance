'use client';

import { createFeedback } from '@/lib/actions';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import * as z from 'zod';
import { Button } from '../../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../../ui/form';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import ToastBody from '../ToastBody';

const formSchema = z.object({
  content: z.string().max(1000).nonempty('Feedback is required.'),
});

interface FeedbackFormProps extends React.HTMLAttributes<HTMLFormElement> {
  onOpenChange?: (value: boolean) => void;
  layout: 'base' | 'dropdown';
}
const FeedbackForm: FC<FeedbackFormProps> = ({
  onOpenChange,
  layout,
  ...props
}) => {
  const { className, ...rest } = props;
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
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
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
    setIsLoading(false);
  }
  return (
    <Form {...form}>
      {layout === 'dropdown' && (
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn('flex flex-col gap-3', className)}
          {...rest}
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
          <Button
            type="submit"
            disabled={isLoading}
            className="m-0"
            variant="brand"
          >
            {isLoading ? 'Submitting...' : 'Submit'}
          </Button>
        </form>
      )}
      {layout === 'base' && (
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn('flex w-full justify-center gap-2', className)}
          {...rest}
        >
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="w-full grow bg-background md:min-w-[240px]"
                    placeholder="Enter any feedback..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            variant="brand"
            type="submit"
            className="m-0"
            size="md"
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Submit'}
          </Button>
        </form>
      )}
    </Form>
  );
};

export default FeedbackForm;
