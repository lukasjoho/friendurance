'use client';
import { slugify } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { revalidatePath } from 'next/cache';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';

const CreateTeamForm = () => {
  const router = useRouter();
  const formSchema: any = z.object({
    name: z.string().nonempty('Name required.'),
    slug: z.string().nonempty('Slug required.'),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    mode: 'onBlur',
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      slug: '',
    },
  });
  const { isSubmitting } = form.formState;
  const formValues = form.getValues();
  const watchedValue = form.watch('name');
  useEffect(() => {
    form.setValue('slug', slugify(watchedValue));
  }, [watchedValue]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // const res = await createTeam(values);
    const res = await fetch('/api/teams', {
      method: 'POST',
      body: JSON.stringify(values),
    });
    const team = await res.json();
    if (res.ok) {
      toast.success(`Team successfully created.`);
      router.push(`/team/${team.slug}`);
      revalidatePath(`/team/${team.slug}`);
    } else {
      if (res.status === 409) {
        toast.error('Team name not available.');
        return;
      }
      toast.error('Team creation failed.');
    }
  }
  return (
    <div>
      <Form {...form}>
        <div className="mb-6 grid grid-cols-1 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Team Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter team name..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormItem>
            <FormLabel>Team URL</FormLabel>
            <Input
              value={`https://friendurance.com/team/${slugify(watchedValue)}`}
              disabled
            />
          </FormItem>
        </div>
        <Button
          onClick={form.handleSubmit(onSubmit)}
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? 'Creating...' : 'Create'}
        </Button>
      </Form>
    </div>
  );
};

export default CreateTeamForm;
