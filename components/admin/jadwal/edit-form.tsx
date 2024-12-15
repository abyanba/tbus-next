"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Select from "react-select";
import { updateJadwal } from "@/lib/jadwal/action";
import { revalidatePath } from "next/cache";

// Update Jadwal Form
const UpdateJadwalForm = ({ id, jadwal }: { id: string; jadwal: any }) => {
  const [waktuKeberangkatan, setWaktuKeberangkatan] = useState<string>(jadwal.waktu_keberangkatan.toISOString().slice(0, 16));
  const [waktuTiba, setWaktuTiba] = useState<string>(jadwal.waktu_tiba.toISOString().slice(0, 16));
  const [harga, setHarga] = useState<number>(jadwal.harga);
  const [selectedBus, setSelectedBus] = useState<number | null>(jadwal.nama_bus.id);
  const [selectedRute, setSelectedRute] = useState<number | null>(jadwal.rute.id);
  const [totalSeat, setTotalSeat] = useState<number>(jadwal.seats.length);
  const [buses, setBuses] = useState<{ id: number; nama: string }[]>([]);
  const [rutes, setRutes] = useState<{ id: number; nama: string }[]>([]);

  const router = useRouter();

  // Ambil data buses dan rutes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const busResponse = await fetch("/api/buses");
        const busesData = await busResponse.json();
        setBuses(busesData);

        const ruteResponse = await fetch("/api/rutes");
        const rutesData = await ruteResponse.json();
        setRutes(rutesData);
      } catch (error) {
        console.error("Error fetching buses and rutes:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validasi input
    if (!waktuKeberangkatan || !waktuTiba || !harga || !selectedBus || !selectedRute ) {
      alert("Semua kolom harus diisi");
      return;
    }

    const formData = new FormData();
    formData.append("waktu_keberangkatan", waktuKeberangkatan);
    formData.append("waktu_tiba", waktuTiba);
    formData.append("harga", harga.toString());
    formData.append("namaBusId", selectedBus.toString());
    formData.append("ruteId", selectedRute.toString());
    formData.append("total_seat", totalSeat.toString());

    try {
      await updateJadwal(id, formData);

      router.push("/jadwal");

      // Revalidate halaman jadwal
      revalidatePath("/jadwal");
    } catch (error) {
      console.error("Error updating jadwal:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Update Jadwal</h2>
      <form onSubmit={handleSubmit}>
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
                value: bus.id,  // `value` sesuai dengan ID bus
                label: bus.nama, // `label` sesuai dengan nama bus
            }))}
            value={buses.find((bus) => bus.id === selectedBus) ? { value: selectedBus, label: buses.find((bus) => bus.id === selectedBus)?.nama } : null}
            onChange={(selectedOption) => {
                setSelectedBus(selectedOption ? selectedOption.value : null); // Mengambil `value` dari option yang dipilih
            }}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="rute" className="block text-sm font-medium text-gray-900">
            Rute
          </label>
          <Select
            name="rute"
            options={rutes.map((rute) => ({
                value: rute.id,  // `value` sesuai dengan ID rute
                label: rute.nama, // `label` sesuai dengan nama rute
            }))}
            value={rutes.find((rute) => rute.id === selectedRute) ? { value: selectedRute, label: rutes.find((rute) => rute.id === selectedRute)?.nama } : null}
            onChange={(selectedOption) => {
                setSelectedRute(selectedOption ? selectedOption.value : null); // Mengambil `value` dari option yang dipilih
            }}
            />
        </div>

        {/* Total Seat */}
        <div className="mb-5">
          <label htmlFor="total_seat" className="block text-sm font-medium text-gray-900">
            Total Seat
          </label>
          <Input
            type="number"
            name="total_seat"
            id="total_seat"
            value={totalSeat}
            onChange={(e) => setTotalSeat(Number(e.target.value))}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>

        <Button type="submit" variant="default" className="w-full mt-4">
          Update Jadwal
        </Button>
      </form>
    </div>
  );
};

export default UpdateJadwalForm;
