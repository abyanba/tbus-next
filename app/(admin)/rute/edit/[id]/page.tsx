import UpdateRuteForm from "@/components/admin/rute/edit-form";
import { getRutesById } from "@/lib/rute/data";
import { notFound } from "next/navigation";

const UpdateRutePage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params; 
  const rute = await getRutesById(id);

  if (!rute) {
    notFound();
  }

  return (
    <div className="max-w-md mx-auto mt-5">
      <h1 className="text-2xl text-center mb-2">Update Rute</h1>
      <UpdateRuteForm rute={rute} />
    </div>
  );
};

export default UpdateRutePage;
