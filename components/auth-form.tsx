import Form from 'next/form';

import { Input } from './ui/input';
import { Label } from './ui/label';

export function AuthForm({
  action,
  children,
  defaultEmail = '',
}: {
  action: NonNullable<
    string | ((formData: FormData) => void | Promise<void>) | undefined
  >;
  children: React.ReactNode;
  defaultEmail?: string;
}) {
  return (
    <Form action={action} className="flex flex-col gap-4 px-4 sm:px-16">
      <div className="flex flex-col gap-2">
        <Label
          htmlFor="email"
          className="text-zinc-600 font-normal dark:text-zinc-400"
        >
          Email Address
        </Label>

        <Input
          id="email"
          name="email"
          defaultValue={defaultEmail}
          required
          autoComplete="email"
          className="w-full px-4 py-2 rounded-lg bg-[#f5f7fa] border border-[#e5e7eb] text-[#22223b] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#7c3aed] transition"
          placeholder="user@acme.com"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label
          htmlFor="password"
          className="text-zinc-600 font-normal dark:text-zinc-400"
        >
          Password
        </Label>

        <Input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="w-full px-4 py-2 rounded-lg bg-[#f5f7fa] border border-[#e5e7eb] text-[#22223b] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#7c3aed] transition"
          placeholder="Password"
        />
      </div>

      {children}
    </Form>
  );
}
