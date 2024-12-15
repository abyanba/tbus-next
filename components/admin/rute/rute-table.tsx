import { getRutes } from "@/lib/rute/data";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DeleteButton } from "@/components/admin/rute/deletebutton";
import { FaEdit } from "react-icons/fa";

const RuteTable = async ({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) => {
  const rutes = await getRutes();

  return (
    <table className="w-full text-lg text-left text-gray-500">
      <thead className="text-xl text-gray-700 uppercase bg-gray-50">
        <tr>
          <th className="py-3 px-6 text-center border-r">ID</th>
          <th className="py-3 px-6 text-center border-r">Terminal Keberangkatan</th>
          <th className="py-3 px-6 text-center border-r">Terminal Tujuan</th>
          <th className="py-3 px-6 text-center">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {rutes.map((rute, index) => (
          <tr key={rute.id} className="bg-white border-b">
            <td className="py-3 px-6 text-center border-r">{index + 1}</td>
            <td className="py-3 px-6 text-center border-r">
              {rute.terminal_keberangkatan.nama + " - " + rute.terminal_keberangkatan.kota}
            </td>
            <td className="py-3 px-6 text-center border-r">
              {rute.terminal_tujuan.nama + " - " + rute.terminal_tujuan.kota}
            </td>
            <td className="flex justify-center gap-1 py-3">
              <Link href={`/rute/edit/${rute.id}`}>
                <Button variant="outline" size="sm" className="mr-2">
                  <FaEdit /> 
                </Button>
              </Link>
              <DeleteButton id={rute.id.toString()} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RuteTable;
