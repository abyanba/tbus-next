"use client";

import { IoTrashOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { deleteJadwal } from "@/lib/jadwal/action";

export const DeleteButton = ({ id }: { id: string }) => {
    const handleDelete = async (event: React.FormEvent) => {
        event.preventDefault();
        const isConfirmed = window.confirm("Apakah Anda yakin ingin menghapus Jadwal ini?");
        if (!isConfirmed) return;

        try {
            await deleteJadwal(id);
        } catch (error) {}
    };

  return (
    <form onSubmit={handleDelete}>
      <Button variant="destructive" size="sm">
        <IoTrashOutline size={20} />
    </Button>
    </form>
  );
};
