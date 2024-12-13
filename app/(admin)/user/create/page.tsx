import CreateUserForm from "@/components/admin/user/create-form";

const CreateUserPage = () => {
  return (
    <div className="max-w-md mx-auto mt-5">
      <h1 className="text-2xl text-center mb-2">Tambahkan User</h1>
      <CreateUserForm />
    </div>
  );
};

export default CreateUserPage;
