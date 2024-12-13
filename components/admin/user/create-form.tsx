"use client";

import { saveUser } from "@/lib/user/action";
import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const CreateUserForm = () => {
  const [state, formAction] = useActionState(saveUser, null);

  return (
    <div className="max-w-xl mx-auto p-4">
      <form action={formAction}>
        {/* User Name */}
        <div className="mb-5">
          <label htmlFor="name" className="block text-sm font-medium text-gray-900">
            Nama
          </label>
          <Input
            type="text"
            name="name"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="John Doe..."
          />
          <div id="name-error" aria-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red-500">{state?.Error?.name}</p>
          </div>
        </div>

        {/* User Email */}
        <div className="mb-5">
          <label htmlFor="email" className="block text-sm font-medium text-gray-900">
            Email
          </label>
          <Input
            type="email"
            name="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="johndoe@example.com"
          />
          <div id="email-error" aria-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red-500">{state?.Error?.email}</p>
          </div>
        </div>

        {/* User Phone */}
        <div className="mb-5">
          <label htmlFor="telepon" className="block text-sm font-medium text-gray-900">
            Telepon
          </label>
          <Input
            type="number"
            name="telepon"
            id="telepon"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="081234567890..."
          />
          <div id="telepon-error" aria-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red-500">{state?.Error?.telepon}</p>
          </div>
        </div>

        {/* Role */}
        <div className="mb-5">
          <label htmlFor="role" className="block text-sm font-medium text-gray-900">
            Role
          </label>
          <select
            name="role"
            id="role"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>

        <div id="message-error" aria-live="polite" aria-atomic="true">
          <p className="mt-2 text-sm text-red-500">{state?.message}</p>
        </div>

        <Button type="submit" variant="default" className="w-full mt-4">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default CreateUserForm;
