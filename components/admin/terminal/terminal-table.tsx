import { getTerminals } from "@/lib/terminal/data";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DeleteButton } from "@/components/admin/terminal/deletebutton";
import { FaEdit } from "react-icons/fa";

const TerminalTable = async ({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) => {
  const terminals = await getTerminals();

  return (
    <table className="w-full text-lg text-left text-gray-500">
      <thead className="text-xl text-gray-700 uppercase bg-gray-50">
        <tr>
          <th className="py-3 px-6 text-center border-r">ID</th>
          <th className="py-3 px-6 text-center border-r">Nama</th>
          <th className="py-3 px-6 text-center border-r">Kecamatan</th>
          <th className="py-3 px-6 text-center border-r">Kota</th>
          <th className="py-3 px-6 text-center border-r">Provinsi</th>
          <th className="py-3 px-6 text-center">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {terminals.map((terminal, index) => (
          <tr key={terminal.id} className="bg-white border-b">
            <td className="py-3 px-6 text-center border-r">{index + 1}</td>
            <td className="py-3 px-6 border-r">{terminal.nama}</td>
            <td className="py-3 px-6 text-center border-r">{terminal.kecamatan}</td>
            <td className="py-3 px-6 text-center border-r">{terminal.kota}</td>
            <td className="py-3 px-6 text-center border-r">{terminal.provinsi}</td>
            <td className="flex justify-center gap-1 py-3">
              <Link href={`/terminal/edit/${terminal.id}`}>
                <Button variant="outline" size="sm" className="mr-2">
                  <FaEdit /> {/* Menampilkan hanya ikon tanpa teks */}
                </Button>
              </Link>
              <DeleteButton id={terminal.id.toString()} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TerminalTable;
