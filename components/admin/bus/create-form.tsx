"use client";

import { saveBus } from "@/lib/bus/action";
import { useActionState, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Select from 'react-select';
import { getFasilitas } from "@/lib/fasilitas/data";


const CreateForm = () => {
  const [state, formAction] = useActionState(saveBus, null);
  const [fasilitas, setFasilitas] = useState<{ id: number; nama: string }[]>([]);

  useEffect(() => {
    // Fetch data fasilitas dari API route
    const fetchFasilitas = async () => {
        try {
          const response = await fetch("/api/fasilitas");
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setFasilitas(data);
        } catch (error) {
          console.error("Failed to fetch fasilitas data:", error);
        }
    };      

    fetchFasilitas();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
      
        // Debug payload
        console.log("Payload sebelum submit:", Object.fromEntries(formData.entries()));

        console.log("Semua fasilitasIds:", formData.getAll("fasilitasIds"));console.log("Semua fasilitasIds:", formData.getAll("fasilitasIds"));
      
        await formAction(formData);
    };
      
  }, []);

  return (
    <div className="max-w-xl mx-auto p-4">
      <form action={formAction}>
        {/* Nama Bus */}
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
            placeholder="Sugeng Rahayu..."
          />
          <div id="name-error" aria-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red-500">{state?.Error?.name}</p>
          </div>
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-900"
          >
            Email
          </label>
          <Input
            type="email"
            name="email"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="sugengrahayu@example.com..."
          />
          <div id="email-error" aria-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red-500">{state?.Error?.email}</p>
          </div>
        </div>
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
        <div className="mb-5">
          <label htmlFor="tipe" className="block text-sm font-medium text-gray-900">
            Tipe Bus
          </label>
          <Input
            type="text"
            name="tipe"
            id="tipe"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Ekonomi, Patas, VIP, Sleeper, dll."
          />
          <div id="tipe-error" aria-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red-500">{state?.Error?.tipe}</p>
          </div>
        </div>
        <div className="mb-5">
          <label htmlFor="total_seat" className="block text-sm font-medium text-gray-900">
            Total Seat
          </label>
          <Input
            type="number"
            name="total_seat"
            id="total_seat"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Total seat pada bus"
          />
          <div id="total_seat-error" aria-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red-500">{state?.Error?.total_seat}</p>
          </div>
        </div>
        {/* Fasilitas */}
        <div className="mb-5">
          <label htmlFor="fasilitas" className="block text-sm font-medium text-gray-900">
            Fasilitas
          </label>
          <Select
            isMulti
            name="fasilitasIds"
            options={fasilitas.map(fasilitasItem => ({
              value: fasilitasItem.id,
              label: fasilitasItem.nama,
            }))}
          />
        </div>

        <Button type="submit" variant="default" className="w-full mt-4">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default CreateForm;
