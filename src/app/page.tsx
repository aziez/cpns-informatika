// app/data-table-demo/page.tsx
"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { columns, FormData } from "./columns";
import { useState } from "react";
import { DataTable } from "./data-table";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ApiResponse {
  data: {
    status: number;
    error: boolean;
    message: string;
    data: {
      meta: {
        total: number;
      };
      page: {
        total: number;
      };
      data: FormData[];
    };
  };
  total: number;
}

async function fetchData(
  pageIndex: number,
  pageSize: number
): Promise<ApiResponse> {
  const offset = pageIndex * pageSize;
  const response = await axios.get<ApiResponse>("/api/proxy", {
    params: {
      offset,
      limit: pageSize,
    },
  });
  return response.data;
}

export default function DataTableDemo() {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["formasi", pageIndex, pageSize],
    queryFn: () => fetchData(pageIndex, pageSize),
    enabled: true,
    placeholderData: keepPreviousData,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  const totalItems = data?.data?.data?.meta.total ?? 0;
  const pageCount = Math.ceil(totalItems / pageSize);

  return (
    <div className="container mx-auto py-10 text-center space-y-4">
      <p>Berikut merupakan data realtime dari situs: sscasn.bkn.go.id</p>
      <Separator />
      <p className="text-lg font-bold">
        Untuk data statis dengan fitur tampilan per halaman yang bisa mencapai
        hingga 1000 data, silakan klik tautan berikut:
      </p>
      <Button>
        <Link href={"/statis"}>DATA STATIS</Link>
      </Button>
      <DataTable
        columns={columns}
        data={data?.data.data.data ?? []}
        pageCount={pageCount}
        pageIndex={pageIndex}
        pageSize={pageSize}
        setPageIndex={setPageIndex}
        setPageSize={setPageSize}
      />
    </div>
  );
}
