import { getFasilitas } from "@/lib/fasilitas/data";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DeleteButton } from "@/components/admin/fasilitas/deleteform";
import { FaEdit } from "react-icons/fa";

const FasilitasTable = async ({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) => {
  const fasilitas = await getFasilitas(); // Mengambil data fasilitas

  return (
    <table className="w-full text-lg text-left text-gray-500">
      <thead className="text-xl text-gray-700 uppercase bg-gray-50">
        <tr>
          <th className="py-3 px-6 text-center border-r">ID</th>
          <th className="py-3 px-6 text-center border-r">Nama Fasilitas</th>
          <th className="py-3 px-6 text-center">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {fasilitas.map((fasilitasItem, index) => (
          <tr key={fasilitasItem.id} className="bg-white border-b">
            <td className="py-3 px-6 text-center border-r">{index + 1}</td>
            <td className="py-3 px-6 text-center border-r">{fasilitasItem.nama}</td>
            <td className="flex justify-center gap-1 py-3">
            <Link href={`/fasilitas/edit/${fasilitasItem.id}`}>
                <Button variant="outline" size="sm" className="mr-2">
                  <FaEdit /> {/* Menampilkan hanya ikon tanpa teks */}
                </Button>
            </Link>
              <DeleteButton id={fasilitasItem.id.toString()} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FasilitasTable;
