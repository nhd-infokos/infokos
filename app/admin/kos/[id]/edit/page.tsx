"use client";

import { useParams } from "next/navigation";
import KosForm from "@/components/admin/KosForm";

export default function EditKosPage() {
  const params = useParams();
  const id = params.id as string;

  return <KosForm kosId={id} />;
}
