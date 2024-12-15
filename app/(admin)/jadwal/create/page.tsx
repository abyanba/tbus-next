import CreateJadwalForm from "@/components/admin/jadwal/create-form";

const CreateJadwalPage = () => {
  return (
    <div className="max-w-md mx-auto mt-5">
      <h1 className="text-2xl text-center mb-2">Tambahkan Jadwal</h1>
      <CreateJadwalForm />
    </div>
  );
};

export default CreateJadwalPage;
