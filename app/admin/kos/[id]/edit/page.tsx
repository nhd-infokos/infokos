"use client";

import { useParams } from "next/navigation";
import KosForm from "@/components/admin/KosForm";
import MarkerManager from "@/components/admin/MarkerManager";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function EditKosPage() {
  const params = useParams();
  const id = params.id as string;

  return (
    <div className="max-w-5xl">
      <Tabs defaultValue="info" className="w-full">
        <TabsList className="bg-zinc-900 border border-zinc-800">
          <TabsTrigger value="info" className="data-[state=active]:bg-zinc-800 data-[state=active]:text-white">Informasi Kos</TabsTrigger>
          <TabsTrigger value="marker" className="data-[state=active]:bg-zinc-800 data-[state=active]:text-white">Marker (Kamar)</TabsTrigger>
        </TabsList>
        <TabsContent value="info" className="mt-6">
          <KosForm kosId={id} />
        </TabsContent>
        <TabsContent value="marker" className="mt-6">
          <MarkerManager kosId={id} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
