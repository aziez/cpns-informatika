// columns.ts
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toIDR } from "@/lib/currency";

export type FormData = {
  formasi_id: string;
  ins_nm: string;
  jp_nama: string;
  formasi_nm: string;
  jabatan_nm: string;
  lokasi_nm: string;
  jumlah_formasi: number;
  disable: number;
  gaji_min: string;
  gaji_max: string;
};

export const columns: ColumnDef<FormData>[] = [
  {
    accessorKey: "jabatan_nm",
    header: "Jabatan",
    enableColumnFilter: true,
  },
  {
    accessorKey: "ins_nm",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Instansi
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: "jp_nama",
    header: "Jenis",
    cell: ({ row }) => <Badge>{row.getValue("jp_nama")}</Badge>,
    enableColumnFilter: true,
  },
  {
    accessorKey: "formasi_nm",
    header: "Formasi",
    enableColumnFilter: true,
  },

  {
    accessorKey: "lokasi_nm",
    header: "Lokasi",
    enableColumnFilter: true,
  },
  {
    accessorKey: "jumlah_formasi",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Jumlah Formasi
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <Badge>{row.getValue("jumlah_formasi")}</Badge>,
    enableColumnFilter: true,
  },
  {
    accessorKey: "gaji_min",
    header: "Gaji Minimal",
    cell: ({ row }) => toIDR(row.getValue("gaji_min")),
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "gaji_max",
    header: "Gaji Maksimal",
    cell: ({ row }) => toIDR(row.getValue("gaji_max")),
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "formasi_id",
    header: "Aksi",
    cell: ({ row }) => {
      const id = row.getValue("formasi_id");

      return (
        <Button onClick={() => console.log(row.getValue("formasi_id"))}>
          <a
            href={`https://sscasn.bkn.go.id/detailformasi/${id}`}
            target="_blank"
          >
            Lihat
          </a>
        </Button>
      );
    },
  },
];
