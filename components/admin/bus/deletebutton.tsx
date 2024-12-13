"use client";

import { IoTrashOutline } from "react-icons/io5";
import { deleteBus } from "@/lib/bus/action";
import { Button } from "@/components/ui/button";

export const DeleteButton = ({ id }: { id: string }) => {
    const handleDelete = async (event: React.FormEvent) => {
        event.preventDefault();
        const isConfirmed = window.confirm("Apakah Anda yakin ingin menghapus Bus ini?");
        if (!isConfirmed) return;

        try {
            await deleteBus(id);
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
