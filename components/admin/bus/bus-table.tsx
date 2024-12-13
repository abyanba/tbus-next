import { getBuses } from "@/lib/bus/data";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DeleteButton } from "./deletebutton";
import { FaEdit } from "react-icons/fa";

const BusTable = async ({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) => {
  // Mengambil data bus beserta fasilitas yang terhubung
  const buses = await getBuses();

  return (
    <table className="w-full text-lg text-left text-gray-500">
      <thead className="text-xl text-gray-700 uppercase bg-gray-50">
        <tr>
          <th className="py-3 px-6 text-center border-r">ID</th>
          <th className="py-3 px-6 text-center border-r">Nama Bus</th>
          <th className="py-3 px-6 text-center border-r">Email</th>
          <th className="py-3 px-6 text-center border-r">Tipe</th>
          <th className="py-3 px-6 text-center border-r">Total Kursi</th>
          <th className="py-3 px-6 text-center border-r">Fasilitas</th>
          <th className="py-3 px-6 text-center">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {buses.map((bus, index) => (
          <tr key={bus.id} className="bg-white border-b">
            <td className="py-3 px-6 text-center border-r">{index + 1}</td>
            <td className="py-3 px-6 border-r">{bus.nama}</td>
            <td className="py-3 px-6 text-center border-r">{bus.email}</td>
            <td className="py-3 px-6 text-center border-r">{bus.tipe}</td>
            <td className="py-3 px-6 text-center border-r">{bus.total_seat}</td>
            <td className="py-3 px-6 text-center">
              {bus.fasilitas.length > 0 ? (
                bus.fasilitas.map((fasilitas, i) => (
                  <span key={fasilitas.id}>
                    {fasilitas.nama}
                    {i < bus.fasilitas.length - 1 && ", "}
                  </span>
                ))
              ) : (
                <span>Tidak ada fasilitas</span>
              )}
            </td>
            <td className="flex justify-center gap-1 py-3">
              <Link href={`/bus/edit/${bus.id}`}>
                  <Button variant="outline" size="sm" className="mr-2">
                    <FaEdit /> {/* Menampilkan hanya ikon tanpa teks */}
                  </Button>
              </Link>
              <DeleteButton id={bus.id.toString()} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BusTable;
