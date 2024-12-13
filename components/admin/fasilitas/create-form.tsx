"use client";

import { saveFasilitas } from "@/lib/fasilitas/action";
import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const CreateForm = () => {
  const [state, formAction] = useActionState(saveFasilitas, null);

  return (
    <div className="max-w-xl mx-auto p-4">
      <form action={formAction}>
        {/* Fasilitas Name */}
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-900"
          >
            Nama Fasilitas
          </label>
          <Input
            type="text"
            name="name"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="AC, WiFi, Toilet, ..."
          />
          <div id="name-error" aria-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red-500">{state?.Error?.name}</p>
          </div>
        </div>

        {/* General Message Error */}
        <div id="message-error" aria-live="polite" aria-atomic="true">
          <p className="mt-2 text-sm text-red-500">{state?.message}</p>
        </div>

        {/* Submit Button */}
        <Button type="submit" variant="default" className="w-full mt-4">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default CreateForm;
