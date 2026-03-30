"use client";

import KosForm from "@/components/admin/KosForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CreateKosPage() {
  return (
    <div className="max-w-5xl">
      <Tabs defaultValue="info" className="w-full">
        <TabsList className="bg-zinc-900 border border-zinc-800">
          <TabsTrigger value="info" className="data-[state=active]:bg-zinc-800 data-[state=active]:text-white">Informasi Kos</TabsTrigger>
          <TabsTrigger value="marker" disabled className="data-[state=active]:bg-zinc-800 data-[state=active]:text-white opacity-50 cursor-not-allowed">Marker (Kamar)</TabsTrigger>
        </TabsList>
        <TabsContent value="info" className="mt-6">
          <KosForm />
        </TabsContent>
        <TabsContent value="marker" className="mt-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8 text-center">
            <p className="text-amber-400 text-sm">⚠️ Simpan kos terlebih dahulu. Setelah disimpan, Anda akan diarahkan ke halaman edit untuk mengelola marker kamar.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
