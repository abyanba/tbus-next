"use client";

import { saveTerminal } from "@/lib/terminal/action";
import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const CreateForm = () => {
  const [state, formAction] = useActionState(saveTerminal, null);

  return (
    <div className="max-w-xl mx-auto p-4">
      <form action={formAction}>
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-900"
          >
            Nama
          </label>
          <Input
            type="text"
            name="name"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Masukkan nama terminal"
          />
          <div id="name-error" aria-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red-500">{state?.Error?.name}</p>
          </div>
        </div>

        <div className="mb-5">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-900"
          >
            Kecamatan
          </label>
          <Input
            type="text"
            name="kecamatan"
            id="kecamatan"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Waru..."
          />
          <div id="name-error" aria-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red-500">{state?.Error?.kecamatan}</p>
          </div>
        </div>

        <div className="mb-5">
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-900"
          >
            Kota
          </label>
          <Input
            type="text"
            name="kota"
            id="kota"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Sidoarjo..."
          />
          <div id="location-error" aria-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red-500">{state?.Error?.kota}</p>
          </div>
        </div>

        <div className="mb-5">
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-900"
          >
            Provinsi
          </label>
          <Input
            type="text"
            name="provinsi"
            id="provinsi"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Jawa Timur..."
          />
          <div id="address-error" aria-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red-500">{state?.Error?.provinsi}</p>
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

export default CreateForm;
