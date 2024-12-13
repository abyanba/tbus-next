import UpdateUserForm from "@/components/admin/user/edit-form";
import { getUserById } from "@/lib/user/data";
import { notFound } from "next/navigation";

const UpdateUserPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const user = await getUserById(id); 

  if (!user) {
    notFound();
  }

  return (
    <div className="max-w-md mx-auto mt-5">
      <h1 className="text-2xl text-center mb-2">Update User</h1>
      <UpdateUserForm user={user} />
    </div>
  );
};

export default UpdateUserPage;
