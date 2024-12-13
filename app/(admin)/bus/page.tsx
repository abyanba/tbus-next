import BusTable from "@/components/admin/bus/bus-table";
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
          Bus
        </div>

        {/* Tombol Tambah Terminal */}
        <div>
          <Button variant="default" size="lg" className="ml-4 bg-green-500 text-white hover:bg-green-600 focus:ring-4 focus:ring-green-300 rounded-lg">
            <Link href="/bus/create">Tambah Bus</Link>
          </Button>
        </div>
      </div>

        <div className="p-4">
        <BusTable query="" currentPage={1} /> 
        </div>
    </div>
    
  );
}