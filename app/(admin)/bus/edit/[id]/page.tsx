import UpdateForm from "@/components/admin/bus/edit-form";
import { getBusesById } from "@/lib/bus/data";
import { notFound } from "next/navigation";

const UpdateBusPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const bus = await getBusesById(id); 

  if (!bus) {
    notFound();
  }

  return (
    <div className="max-w-md mx-auto mt-5">
      <h1 className="text-2xl text-center mb-2">Update Bus</h1>
      <UpdateForm bus={bus} />
    </div>
  );
};

export default UpdateBusPage;
