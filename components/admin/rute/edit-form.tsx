"use client";

import { updateRute } from "@/lib/rute/action";
import { startTransition, useActionState, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Select from "react-select";
import { Terminal } from "@prisma/client"; 

const UpdateRuteForm = ({ rute }: { rute: { id: number; terminal_keberangkatan: Terminal; terminal_tujuan: Terminal } }) => {
  const updateRuteWithId = updateRute.bind(null, String(rute.id));
  const [state, formAction] = useActionState(updateRuteWithId, null);
  const [terminals, setTerminals] = useState<Terminal[]>([]);  // State untuk terminal
  const [selectedTerminalKeberangkatan, setSelectedTerminalKeberangkatan] = useState<{ value: number; label: string } | null>(null);
  const [selectedTerminalTujuan, setSelectedTerminalTujuan] = useState<{ value: number; label: string } | null>(null);

  useEffect(() => {
    const fetchTerminals = async () => {
      try {
        const response = await fetch("/api/terminals");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTerminals(data);
      } catch (error) {
        console.error("Error fetching terminal data:", error);
      }
    };

    fetchTerminals();

    // Set default terminals from rute
    setSelectedTerminalKeberangkatan({
      value: rute.terminal_keberangkatan.id,
      label: `${rute.terminal_keberangkatan.nama} - ${rute.terminal_keberangkatan.kota}`,
    });
    setSelectedTerminalTujuan({
      value: rute.terminal_tujuan.id,
      label: `${rute.terminal_tujuan.nama} - ${rute.terminal_tujuan.kota}`,
    });
  }, [rute]);

  const terminalOptions = terminals.map((terminal) => ({
    value: terminal.id,
    label: `${terminal.nama} - ${terminal.kota}`,
  }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Terminal Keberangkatan */}
        <div className="mb-5">
          <label htmlFor="terminal_keberangkatan" className="block text-sm font-medium text-gray-900">
            Terminal Keberangkatan
          </label>
          <Select
            name="terminalKeberangkatanId"
            options={terminalOptions}
            value={selectedTerminalKeberangkatan} // Menggunakan state untuk nilai yang dipilih
            onChange={(selectedOption) => {
              setSelectedTerminalKeberangkatan(selectedOption as { value: number; label: string });
            }}
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
            options={terminalOptions}
            value={selectedTerminalTujuan} // Menggunakan state untuk nilai yang dipilih
            onChange={(selectedOption) => {
              setSelectedTerminalTujuan(selectedOption as { value: number; label: string });
            }}
          />
          <div id="terminalTujuan-error" aria-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red-500">{state?.Error?.terminalTujuanId}</p>
          </div>
        </div>

        <Button type="submit" variant="default" className="w-full mt-4">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default UpdateRuteForm;
