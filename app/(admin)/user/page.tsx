import UserTable from "@/components/admin/user/user-table";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link"; 

export default function Home() {
  return (
    <div>
        <Navbar />

        <div className="p-4 flex justify-between items-center mt-4">
        {/* Judul */}
        <div className="text-5xl font-bold">
          User
        </div>

        <div>
          <Button variant="default" size="lg" className="ml-4 bg-green-500 text-white hover:bg-green-600 focus:ring-4 focus:ring-green-300 rounded-lg">
            <Link href="/user/create">Tambah User</Link>
          </Button>
        </div>
      </div>

        <div className="p-4">
        <UserTable query="" currentPage={1} /> 
        </div>
    </div>
    
  );
}