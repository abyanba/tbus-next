"use client";

import { saveRute } from "@/lib/rute/action"; // Sesuaikan dengan path yang sesuai
import { useActionState, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Select from 'react-select';


const CreateRuteForm = () => {
  const [state, formAction] = useActionState(saveRute, null);
  const [terminals, setTerminals] = useState<{ id: number; nama: string; kota:string }[]>([]);

  useEffect(() => {
    // Fetch data terminals dari API route
    const fetchTerminals = async () => {
        try {
          const response = await fetch("/api/terminals");
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setTerminals(data);
        } catch (error) {
          console.error("Failed to fetch terminal data:", error);
        }
      };      

    fetchTerminals();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        await formAction(formData);
    };

  }, []);

  return (
    <div className="max-w-xl mx-auto p-4">
      <form action={formAction}>
        {/* Terminal Keberangkatan */}
        <div className="mb-5">
          <label htmlFor="terminal_keberangkatan" className="block text-sm font-medium text-gray-900">
            Terminal Keberangkatan
          </label>
          <Select
            name="terminalKeberangkatanId"
            options={terminals.map((terminal) => ({
              value: terminal.id,
              label: terminal.nama + " - " + terminal.kota,
            }))}
            className="w-full"
          />
          <div id="terminalKeberangkatan-error" aria-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red-500">{state?.Error?.terminalKeberangkatanId}</p>
          </div>
        </div>

        {/* Terminal Tujuan */}
        <div className="mb-5">
          <label htmlFor="terminal_tujuan" className="block text-sm font-medium text-gray-900">
            Terminal Tujuan
          </label>
          <Select
            name="terminalTujuanId"
            options={terminals.map((terminal) => ({
              value: terminal.id,
              label: terminal.nama + " - " + terminal.kota,
            }))}
            className="w-full"
          />
          <div id="terminalTujuan-error" aria-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red-500">{state?.Error?.terminalTujuanId}</p>
          </div>
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full mt-4">
          Simpan Rute
        </Button>
      </form>
    </div>
  );
};

export default CreateRuteForm;
