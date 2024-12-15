import { getJadwals } from "@/lib/jadwal/data"; // Sesuaikan dengan lokasi fungsi getJadwals Anda
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DeleteButton } from "./deletebutton";
import { FaEdit } from "react-icons/fa";

const formatDuration = (start: Date, end: Date) => {
    const diffInMilliseconds = new Date(end).getTime() - new Date(start).getTime();
    const hours = Math.floor(diffInMilliseconds / (1000 * 60 * 60)); // Menghitung jam
    const minutes = Math.floor((diffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60)); // Menghitung menit
    return `${hours}h ${minutes}m`; // Mengembalikan dalam format jam dan menit
};

const JadwalTable = async ({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) => {
  const jadwals = await getJadwals(); // Ambil data jadwal

  return (
    <table className="w-full text-lg text-left text-gray-500">
      <thead className="text-xl text-gray-700 uppercase bg-gray-50">
        <tr>
          <th className="py-3 px-6 text-center border-r">ID</th>
          <th className="py-3 px-6 text-center border-r">Bus</th>
          <th className="py-3 px-6 text-center">Rute</th>
          <th className="py-3 px-6 text-center border-r">Harga</th>
          <th className="py-3 px-6 text-center border-r">Waktu Keberangkatan</th>
          <th className="py-3 px-6 text-center border-r">Waktu Tiba</th>
          <th className="py-3 px-6 text-center border-r">Durasi</th>
          <th className="py-3 px-6 text-center">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {jadwals.map((jadwal, index) => (
          <tr key={jadwal.id} className="bg-white border-b">
            <td className="py-3 px-6 text-center border-r">{index + 1}</td>
            <td className="py-3 px-6 text-center border-r">{jadwal.nama_bus.nama}</td>
            <td className="py-3 px-6 text-center border-r">
              {jadwal.rute.terminal_keberangkatan.nama} - {jadwal.rute.terminal_tujuan.nama}
            </td>
            <td className="py-3 px-6 text-center border-r">{jadwal.harga}</td>
            <td className="py-3 px-6 text-center border-r">
              {new Date(jadwal.waktu_keberangkatan).toLocaleString()}
            </td>
            <td className="py-3 px-6 text-center border-r">
              {new Date(jadwal.waktu_tiba).toLocaleString()}
            </td>
            <td className="py-3 px-6 text-center border-r">
              {formatDuration(jadwal.waktu_keberangkatan, jadwal.waktu_tiba)} {/* Menampilkan durasi */}
            </td>
            <td className="flex justify-center gap-1 py-3">
              <Link href={`/jadwal/edit/${jadwal.id}`}>
                <Button variant="outline" size="sm" className="mr-2">
                  <FaEdit />
                </Button>
              </Link>
              <DeleteButton id={jadwal.id.toString()} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default JadwalTable;
