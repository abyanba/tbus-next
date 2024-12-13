import UpdateForm from "@/components/admin/fasilitas/edit-form";
import { getFasilitasById } from "@/lib/fasilitas/data";
import { notFound } from "next/navigation";

const UpdateFasilitasPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const fasilitas = await getFasilitasById(id); 

  if (!fasilitas) {
    notFound();
  }

  return (
    <div className="max-w-md mx-auto mt-5">
      <h1 className="text-2xl text-center mb-2">Update Fasilitas</h1>
      <UpdateForm fasilitas={fasilitas} />
    </div>
  );
};

export default UpdateFasilitasPage;
