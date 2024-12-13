"use client";

import { updateFasilitas } from "@/lib/fasilitas/action";
import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Fasilitas } from "@prisma/client";

const UpdateForm = ({ fasilitas }: { fasilitas: Fasilitas }) => {
  const UpdateFasilitasWithId = updateFasilitas.bind(null, String(fasilitas.id));
  const [state, formAction] = useActionState(UpdateFasilitasWithId, null);

  return (
    <div>
      <form action={formAction}>
        <div className="mb-5">
          <label htmlFor="name" className="block text-sm font-medium text-gray-900">
            Nama Fasilitas
          </label>
          <Input
            type="text"
            name="name"
            id="name"
            defaultValue={fasilitas.nama}
          />
          <div id="name-error" aria-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red-500">{state?.Error?.name}</p>
          </div>
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

export default UpdateForm;
