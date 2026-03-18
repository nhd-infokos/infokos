"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

interface Kos {
  id: string;
  name: string;
  slug: string;
  city: string | null;
  district: string | null;
  price: number;
  kos_type: string | null;
  is_published: boolean;
  is_featured: boolean;
  image_url: string | null;
}

function formatPrice(price: number): string {
  return `Rp ${new Intl.NumberFormat("id-ID").format(price)}`;
}

export default function AdminKosList() {
  const [kosList, setKosList] = useState<Kos[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchKos = async () => {
    try {
      const res = await fetch("/api/admin/kos");
      const json = await res.json();
      setKosList(json.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Gagal memuat data kos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchKos(); }, []);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/kos/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed");
      toast.success("Kos berhasil dihapus");
      setKosList((prev) => prev.filter((k) => k.id !== id));
    } catch {
      toast.error("Gagal menghapus kos");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Kelola Kos</h1>
          <p className="text-zinc-400 text-sm mt-1">Daftar semua properti kos</p>
        </div>
        <Link href="/admin/kos/create">
          <Button className="bg-white text-black hover:bg-zinc-200 font-semibold">
            + Tambah Kos Baru
          </Button>
        </Link>
      </div>

      {loading ? (
        <p className="text-zinc-500 animate-pulse">Memuat data...</p>
      ) : kosList.length === 0 ? (
        <div className="text-center py-16 text-zinc-500">
          <p className="text-lg mb-2">Belum ada data kos</p>
          <p className="text-sm">Klik "Tambah Kos Baru" untuk memulai</p>
        </div>
      ) : (
        <div className="rounded-xl border border-zinc-800 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-800 hover:bg-zinc-900/50">
                <TableHead className="text-zinc-400">Nama Kos</TableHead>
                <TableHead className="text-zinc-400">Lokasi</TableHead>
                <TableHead className="text-zinc-400">Harga</TableHead>
                <TableHead className="text-zinc-400">Tipe</TableHead>
                <TableHead className="text-zinc-400">Status</TableHead>
                <TableHead className="text-zinc-400 text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {kosList.map((kos) => (
                <TableRow key={kos.id} className="border-zinc-800 hover:bg-zinc-900/50">
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      {kos.image_url && (
                        <img src={kos.image_url} alt={kos.name} className="w-10 h-10 rounded-lg object-cover bg-zinc-800" />
                      )}
                      <div>
                        <p className="font-semibold">{kos.name}</p>
                        {kos.is_featured && (
                          <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-[10px] mt-0.5">Featured</Badge>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-zinc-400">
                    {kos.district}, {kos.city}
                  </TableCell>
                  <TableCell className="text-zinc-300 font-medium">
                    {formatPrice(kos.price)}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-zinc-700 text-zinc-300 capitalize">
                      {kos.kos_type || "-"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={kos.is_published
                      ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                      : "bg-zinc-700/50 text-zinc-400 border-zinc-600"
                    }>
                      {kos.is_published ? "Published" : "Draft"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/kos/${kos.id}/edit`}>
                        <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white hover:bg-zinc-800">
                          Edit
                        </Button>
                      </Link>
                      <AlertDialog>
                        <AlertDialogTrigger>
                          <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300 hover:bg-red-500/10">
                            Hapus
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-zinc-900 border-zinc-800 text-white">
                          <AlertDialogHeader>
                            <AlertDialogTitle>Hapus {kos.name}?</AlertDialogTitle>
                            <AlertDialogDescription className="text-zinc-400">
                              Semua data terkait (fasilitas, ruangan, gambar) juga akan dihapus. Aksi ini tidak bisa dibatalkan.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700">Batal</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(kos.id)} className="bg-red-600 hover:bg-red-700 text-white">
                              Hapus
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
