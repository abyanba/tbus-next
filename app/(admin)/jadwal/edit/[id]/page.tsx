import UpdateJadwalForm from "@/components/admin/jadwal/edit-form";
import { getJadwalById } from "@/lib/jadwal/data";
import { notFound } from "next/navigation";

// Halaman untuk Update Jadwal
const UpdateJadwalPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const jadwal = await getJadwalById(id);

  if (!jadwal) {
    notFound();
  }

  return (
    <div className="max-w-md mx-auto mt-5">
      <h1 className="text-2xl text-center mb-2">Update Jadwal</h1>
      <UpdateJadwalForm id={id} jadwal={jadwal} />
    </div>
  );
};

export default UpdateJadwalPage;
