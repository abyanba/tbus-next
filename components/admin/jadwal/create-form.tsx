"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Select from "react-select";
import { saveJadwal } from "@/lib/jadwal/action";  // Fungsi saveJadwal untuk menyimpan data
import { useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";

const CreateJadwalForm = () => {
  const [waktuKeberangkatan, setWaktuKeberangkatan] = useState<string>("");  // Pastikan nilai default adalah string
  const [waktuTiba, setWaktuTiba] = useState<string>("");  // Pastikan nilai default adalah string
  const [harga, setHarga] = useState<number>(0);
  const [selectedBus, setSelectedBus] = useState<number | null>(null);
  const [selectedRute, setSelectedRute] = useState<number | null>(null);
  const [buses, setBuses] = useState<{ id: number; nama: string }[]>([]);
  const [rutes, setRutes] = useState<{ id: number; nama: string }[]>([]);
  const router = useRouter()

  useEffect(() => {
    // Fetch data buses dan rutes dari API
    const fetchData = async () => {
      try {
        const busResponse = await fetch("/api/buses");
        if (!busResponse.ok) {
          throw new Error("Gagal mengambil data bus");
        }
        const busesData = await busResponse.json();
        setBuses(busesData);

        const ruteResponse = await fetch("/api/rutes");
        if (!ruteResponse.ok) {
          throw new Error("Gagal mengambil data rute");
        }
        const rutesData = await ruteResponse.json();
        setRutes(rutesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validasi input
    if (!waktuKeberangkatan || !waktuTiba || !harga || !selectedBus || !selectedRute) {
      alert("Semua kolom harus diisi");
      return;
    }

    const formData = {
      waktuKeberangkatan: new Date(waktuKeberangkatan), 
      waktuTiba: new Date(waktuTiba),                   
      harga,
      busId: selectedBus,
      ruteId: selectedRute,
    };

    try {
      await saveJadwal(formData); 
      alert("Jadwal berhasil ditambahkan!");
      
      router.push("/jadwal");

      // Revalidate halaman /jadwal
      revalidatePath("/jadwal");
    } catch (error) {
      console.error("Error saving jadwal:", error);
      alert("Gagal menambahkan jadwal");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <form onSubmit={handleSubmit}>
        {/* Waktu Keberangkatan */}
        <div className="mb-5">
          <label htmlFor="waktu_keberangkatan" className="block text-sm font-medium text-gray-900">
            Waktu Keberangkatan
          </label>
          <Input
            type="datetime-local"
            name="waktu_keberangkatan"
            id="waktu_keberangkatan"
            value={waktuKeberangkatan}
            onChange={(e) => setWaktuKeberangkatan(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>

        {/* Waktu Tiba */}
        <div className="mb-5">
          <label htmlFor="waktu_tiba" className="block text-sm font-medium text-gray-900">
            Waktu Tiba
          </label>
          <Input
            type="datetime-local"
            name="waktu_tiba"
            id="waktu_tiba"
            value={waktuTiba}
            onChange={(e) => setWaktuTiba(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>

        {/* Harga */}
        <div className="mb-5">
          <label htmlFor="harga" className="block text-sm font-medium text-gray-900">
            Harga
          </label>
          <Input
            type="number"
            name="harga"
            id="harga"
            value={harga}
            onChange={(e) => setHarga(Number(e.target.value))}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Masukkan harga"
          />
        </div>

        {/* Bus */}
        <div className="mb-5">
          <label htmlFor="bus" className="block text-sm font-medium text-gray-900">
            Bus
          </label>
          <Select
            name="bus"
            options={buses.map((bus) => ({
              value: bus.id,
              label: bus.nama,
            }))}
            onChange={(selectedOption) => setSelectedBus(selectedOption?.value || null)}
          />
        </div>

        {/* Rute */}
        <div className="mb-5">
          <label htmlFor="rute" className="block text-sm font-medium text-gray-900">
            Rute
          </label>
          <Select
            name="rute"
            options={rutes.map((rute) => ({
              value: rute.id,
              label: rute.nama,
            }))}
            onChange={(selectedOption) => setSelectedRute(selectedOption?.value || null)}
          />
        </div>

        <Button type="submit" variant="default" className="w-full mt-4">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default CreateJadwalForm;