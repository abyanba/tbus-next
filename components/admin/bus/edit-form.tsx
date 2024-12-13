"use client";

import { updateBus } from "@/lib/bus/action";
import { startTransition, useActionState, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Select from "react-select";
import { Bus, Fasilitas } from "@prisma/client";

const UpdateForm = ({ bus }: { bus: Bus & { fasilitas: Fasilitas[] } }) => {
  const updateBusWithId = updateBus.bind(null, String(bus.id));
  const [state, formAction] = useActionState(updateBusWithId, null);
  const [fasilitas, setFasilitas] = useState<Fasilitas[]>([]);
  const [selectedFasilitas, setSelectedFasilitas] = useState<{ value: number; label: string }[]>([]);

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
        console.error("Error fetching fasilitas data:", error);
      }
    };

    fetchFasilitas();

    // Set default fasilitas from bus
    setSelectedFasilitas(
      bus.fasilitas.map((f) => ({
        value: f.id,
        label: f.nama,
      }))
    );
  }, [bus]);

  const fasilitasOptions = fasilitas.map((fasilitasItem) => ({
    value: fasilitasItem.id,
    label: fasilitasItem.nama,
  }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label htmlFor="name" className="block text-sm font-medium text-gray-900">
            Nama Bus
          </label>
          <Input
            type="text"
            name="name"
            id="name"
            defaultValue={bus.nama}
          />
        </div>

        {/* Input Email */}
        <div className="mb-5">
          <label htmlFor="email" className="block text-sm font-medium text-gray-900">
            Email
          </label>
          <Input
            type="email"
            name="email"
            id="email"
            defaultValue={bus.email}
          />
        </div>

        {/* Input Telepon */}
        <div className="mb-5">
          <label htmlFor="telepon" className="block text-sm font-medium text-gray-900">
            Telepon
          </label>
          <Input
            type="number"
            name="telepon"
            id="telepon"
            defaultValue={bus.telepon}
          />
        </div>

        {/* Input Tipe */}
        <div className="mb-5">
          <label htmlFor="tipe" className="block text-sm font-medium text-gray-900">
            Tipe
          </label>
          <Input
            type="text"
            name="tipe"
            id="tipe"
            defaultValue={bus.tipe}
          />
        </div>

        {/* Input Total Seat */}
        <div className="mb-5">
          <label htmlFor="total_seat" className="block text-sm font-medium text-gray-900">
            Total Seat
          </label>
          <Input
            type="number"
            name="total_seat"
            id="total_seat"
            defaultValue={bus.total_seat}
          />
        </div>

        {/* Fasilitas (Multiple Select) */}
        <div className="mb-5">
          <label htmlFor="fasilitas" className="block text-sm font-medium text-gray-900">
            Pilih Fasilitas
          </label>
          <Select
            isMulti
            name="fasilitasIds"
            options={fasilitasOptions}
            value={selectedFasilitas} // Menggunakan state untuk nilai yang dipilih
            onChange={(selectedOptions) => {
              setSelectedFasilitas(selectedOptions as { value: number; label: string }[]);
            }}
          />
        </div>

        <Button type="submit" variant="default" className="w-full mt-4">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default UpdateForm;
