import UpdateForm from "@/components/admin/terminal/edit-form";
import { getTerminalById } from "@/lib/terminal/data";
import { notFound } from "next/navigation";

const UpdateTerminalPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const terminal = await getTerminalById(id); 

  if (!terminal) {
    notFound();
  }

  return (
    <div className="max-w-md mx-auto mt-5">
      <h1 className="text-2xl text-center mb-2">Update Terminal</h1>
      <UpdateForm terminal={terminal} />
    </div>
  );
};

export default UpdateTerminalPage;
