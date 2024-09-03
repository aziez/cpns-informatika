"use client";
import { useState, useMemo } from "react";
import dataJson from "@/data/data.json";
import { DataTable } from "../data-table";
import { columns } from "../columns";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface DataItem {
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
}

interface DataEntry {
  data: {
    data: DataItem[];
  };
}

type DataJson = DataEntry[];

export default function DataTableDemo() {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const data: DataJson = dataJson as DataJson;

  // Reformatted data structure
  const reformattedData = useMemo(() => {
    return data.flatMap(
      (entry) =>
        entry.data.data.map((item) => ({
          formasi_id: item.formasi_id,
          ins_nm: item.ins_nm,
          jp_nama: item.jp_nama,
          formasi_nm: item.formasi_nm,
          jabatan_nm: item.jabatan_nm,
          lokasi_nm: item.lokasi_nm,
          jumlah_formasi: item.jumlah_formasi,
          disable: item.disable,
          gaji_min: item.gaji_min,
          gaji_max: item.gaji_max,
        })) as DataItem[]
    );
  }, [data]);

  // Calculate the total number of pages
  const totalItems = reformattedData.length;
  const pageCount = Math.ceil(totalItems / pageSize);

  // Get the data slice for the current page
  const currentPageData = useMemo(() => {
    const start = pageIndex * pageSize;
    return reformattedData.slice(start, start + pageSize);
  }, [pageIndex, pageSize, reformattedData]);

  return (
    <div className="container mx-auto py-10">
      <Button>
        <Link href={"/"}>Kembali</Link>
      </Button>
      <DataTable
        columns={columns}
        data={currentPageData}
        pageCount={pageCount}
        pageIndex={pageIndex}
        pageSize={pageSize}
        setPageIndex={setPageIndex}
        setPageSize={setPageSize}
      />
    </div>
  );
}
