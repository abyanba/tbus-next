import { getUsers } from "@/lib/user/data";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DeleteButton } from "@/components/admin/user/deletebutton";
import { FaEdit } from "react-icons/fa";

const UserTable = async ({ query, currentPage }: { query: string, currentPage: number }) => {
  const users = await getUsers();

  return (
    <table className="w-full text-lg text-left text-gray-500">
      <thead className="text-xl text-gray-700 uppercase bg-gray-50">
        <tr>
          <th className="py-3 px-6 text-center border-r">ID</th>
          <th className="py-3 px-6 text-center border-r">Nama</th>
          <th className="py-3 px-6 text-center border-r">Email</th>
          <th className="py-3 px-6 text-center border-r">Telepon</th>
          <th className="py-3 px-6 text-center">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={user.id} className="bg-white border-b">
            <td className="py-3 px-6 text-center border-r">{index + 1}</td>
            <td className="py-3 px-6 border-r">{user.nama}</td>
            <td className="py-3 px-6 text-center border-r">{user.email}</td>
            <td className="py-3 px-6 text-center border-r">{user.telepon}</td>
            <td className="flex justify-center gap-1 py-3">
            <Link href={`/user/edit/${user.id}`}>
                <Button variant="outline" size="sm" className="mr-2">
                  <FaEdit /> 
                </Button>
              </Link>
              <DeleteButton id={user.id.toString()} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
