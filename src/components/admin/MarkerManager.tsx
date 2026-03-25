"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { KosRoom, Kos } from "@/types/kos";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { Trash2, Edit2, MapPin, Monitor, Smartphone } from "lucide-react";

type ViewMode = "desktop" | "mobile";

interface MarkerManagerProps {
  kosId: string;
}

export default function MarkerManager({ kosId }: MarkerManagerProps) {
  const [kos, setKos] = useState<Kos | null>(null);
  const [rooms, setRooms] = useState<KosRoom[]>([]);
  const [loading, setLoading] = useState(true);
  
  // View mode: desktop or mobile
  const [viewMode, setViewMode] = useState<ViewMode>("desktop");
  
  // Dialog state
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState<string | null>(null);
  
  // Interactive mapping mode
  const [isMappingMode, setIsMappingMode] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  const [form, setForm] = useState<Partial<KosRoom>>({
    name: "",
    description: "",
    image_url: "",
    video_url: "",
    marker_top: "50%",
    marker_left: "50%",
    marker_mobile_top: "50%",
    marker_mobile_left: "50%",
    sort_order: 1
  });

  const fetchKosAndRooms = async () => {
    try {
      setLoading(true);
      const [kosRes, roomsRes] = await Promise.all([
        fetch(`/api/admin/kos/${kosId}`),
        fetch(`/api/admin/kos/${kosId}/rooms`)
      ]);
      const jsonKos = await kosRes.json();
      const jsonRooms = await roomsRes.json();
      setKos(jsonKos.data);
      setRooms(jsonRooms.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Gagal memuat data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKosAndRooms();
  }, [kosId]);

  const handleOpenDialog = (room?: KosRoom) => {
    if (room) {
      setForm(room);
    } else {
      setForm({
        name: "",
        description: "",
        image_url: "",
        video_url: "",
        marker_top: "50%",
        marker_left: "50%",
        marker_mobile_top: "50%",
        marker_mobile_left: "50%",
        sort_order: rooms.length + 1
      });
    }
    setIsDialogOpen(true);
    setIsMappingMode(false);
  };

  const handleSave = async () => {
    if (!form.name) return toast.error("Nama marker harus diisi");
    
    setSaving(true);
    try {
      const isEdit = !!form.id;
      const url = isEdit 
        ? `/api/admin/kos/${kosId}/rooms/${form.id}` 
        : `/api/admin/kos/${kosId}/rooms`;
      const method = isEdit ? "PUT" : "POST";
      
      const payload = { ...form, kos_id: kosId };
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      
      if (!res.ok) throw new Error("Failed to save");
      
      toast.success(isEdit ? "Marker berhasil diupdate" : "Marker berhasil ditambahkan");
      setIsDialogOpen(false);
      fetchKosAndRooms();
    } catch (error) {
      toast.error("Gagal menyimpan marker");
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = (id: string) => {
    setRoomToDelete(id);
    setIsAlertOpen(true);
  };

  const handleDelete = async () => {
    if (!roomToDelete) return;
    try {
      const res = await fetch(`/api/admin/kos/${kosId}/rooms/${roomToDelete}`, {
        method: "DELETE"
      });
      if (!res.ok) throw new Error("Failed to delete");
      toast.success("Marker berhasil dihapus");
      fetchKosAndRooms();
    } catch (error) {
      toast.error("Gagal menghapus marker");
      console.error(error);
    } finally {
      setIsAlertOpen(false);
      setRoomToDelete(null);
    }
  };

  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!isMappingMode || !imageRef.current) return;
    
    const rect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;
    
    if (viewMode === "desktop") {
      setForm(prev => ({
        ...prev,
        marker_left: `${percentX.toFixed(2)}%`,
        marker_top: `${percentY.toFixed(2)}%`
      }));
    } else {
      setForm(prev => ({
        ...prev,
        marker_mobile_left: `${percentX.toFixed(2)}%`,
        marker_mobile_top: `${percentY.toFixed(2)}%`
      }));
    }
    
    toast.success(`Koordinat ${viewMode === "desktop" ? "desktop" : "mobile"} diperbarui. Klik Simpan Form Marker untuk menyimpan.`);
  };

  // Helper to get current marker coordinates based on view mode
  const getCurrentMarkerTop = () => viewMode === "desktop" ? form.marker_top : form.marker_mobile_top;
  const getCurrentMarkerLeft = () => viewMode === "desktop" ? form.marker_left : form.marker_mobile_left;

  // Helper to get marker position for a room based on view mode
  const getRoomMarkerTop = (room: KosRoom) => viewMode === "desktop" ? (room.marker_top || "50%") : (room.marker_mobile_top || "50%");
  const getRoomMarkerLeft = (room: KosRoom) => viewMode === "desktop" ? (room.marker_left || "50%") : (room.marker_mobile_left || "50%");

  if (loading) return <div className="animate-pulse flex items-center justify-center p-12 text-zinc-500">Memuat manajemen marker...</div>;
  if (!kos) return <div className="p-4 text-red-400">Data kos tidak ditemukan</div>;

  const detailDesktopImage = kos.kos_images?.find(img => !img.is_primary && img.sort_order === 2)?.url || kos.image_url || "";
  const detailMobileImage = kos.image_mobile_url || detailDesktopImage;
  const currentImage = viewMode === "desktop" ? detailDesktopImage : detailMobileImage;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white">Manajemen Marker (Kamar)</h2>
          <p className="text-zinc-400 text-sm mt-1">Tambahkan marker dan atur letaknya di gambar layout kos</p>
        </div>
        <Button onClick={() => handleOpenDialog()} className="bg-white text-black hover:bg-zinc-200 font-semibold">
          + Tambah Marker
        </Button>
      </div>

      {/* Desktop / Mobile Toggle */}
      <div className="flex items-center gap-1 p-1 bg-zinc-800/50 rounded-lg border border-zinc-700 w-fit">
        <button
          onClick={() => setViewMode("desktop")}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
            viewMode === "desktop"
              ? "bg-white text-black shadow-sm"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <Monitor className="w-4 h-4" />
          Desktop
        </button>
        <button
          onClick={() => setViewMode("mobile")}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
            viewMode === "mobile"
              ? "bg-white text-black shadow-sm"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <Smartphone className="w-4 h-4" />
          Mobile
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Visual Map Setup */}
        <div className={`relative w-full bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden group ${
          viewMode === "mobile" ? "aspect-[9/16] max-w-[300px]" : "aspect-[4/3] md:aspect-[16/9]"
        }`}>
          {currentImage ? (
            <img 
              ref={imageRef}
              src={currentImage} 
              alt="Kos Blueprint" 
              className={`w-full h-full object-cover select-none transition-all ${isMappingMode ? 'cursor-crosshair opacity-80' : 'opacity-100'}`}
              onClick={handleImageClick}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-zinc-500">
              {viewMode === "mobile" ? "Image mobile tidak tersedia" : "Image tidak tersedia"}
            </div>
          )}

          {isMappingMode && (
            <div className="absolute top-4 left-4 right-4 bg-blue-500/20 text-blue-300 border border-blue-500/50 p-2 text-sm rounded-lg backdrop-blur-md text-center pointer-events-none">
              Mode Mapping Aktif ({viewMode === "desktop" ? "Desktop" : "Mobile"}). Klik pada area gambar untuk menetapkan posisi marker. 
              Posisi saat ini: {getCurrentMarkerLeft()}, {getCurrentMarkerTop()}
            </div>
          )}

          {/* Render markers */}
          {!isMappingMode && rooms.map((room) => {
            const top = getRoomMarkerTop(room);
            const left = getRoomMarkerLeft(room);
            // Don't show marker if no position set for this view mode
            if (viewMode === "mobile" && !room.marker_mobile_top && !room.marker_mobile_left) {
              return (
                <div
                  key={room.id}
                  className="absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 cursor-pointer group/marker"
                  style={{ top: "50%", left: "50%" }}
                  onClick={() => handleOpenDialog(room)}
                  title={`${room.name} (belum diatur posisi mobile)`}
                >
                  <div className="w-8 h-8 bg-orange-600/80 border border-orange-400/40 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 relative">
                    <MapPin className="w-4 h-4 text-white" />
                    <div className="absolute top-10 w-max px-2 py-1 bg-black text-orange-300 text-xs rounded opacity-0 group-hover/marker:opacity-100 pointer-events-none transition-opacity">
                      {room.name} (posisi mobile belum diatur)
                    </div>
                  </div>
                </div>
              );
            }
            return (
              <div
                key={room.id}
                className="absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 cursor-pointer group/marker"
                style={{ top, left }}
                onClick={() => handleOpenDialog(room)}
                title={room.name}
              >
                <div className="w-8 h-8 bg-black/80 border border-white/20 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 relative">
                  <MapPin className="w-4 h-4 text-white" />
                  <div className="absolute top-10 w-max px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover/marker:opacity-100 pointer-events-none transition-opacity">
                    {room.name}
                  </div>
                </div>
              </div>
            );
          })}
          
          {/* Render current marker being edited in mapping mode */}
          {isMappingMode && getCurrentMarkerLeft() && getCurrentMarkerTop() && (
            <div 
              className="absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{ top: getCurrentMarkerTop()!, left: getCurrentMarkerLeft()! }}
            >
              <div className="w-8 h-8 bg-blue-500 border-2 border-white rounded-full flex items-center justify-center shadow-lg animate-pulse">
                <MapPin className="w-4 h-4 text-white" />
              </div>
            </div>
          )}
        </div>

        {/* Marker List */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
          <div className="p-4 border-b border-zinc-800 bg-zinc-900">
            <h3 className="font-semibold text-white">Daftar Marker</h3>
          </div>
          <div className="divide-y divide-zinc-800/50">
            {rooms.length === 0 ? (
              <div className="p-6 text-center text-zinc-500 text-sm">Belum ada marker. Klik Tambah Marker untuk memulai.</div>
            ) : (
              rooms.map((room) => (
                <div key={room.id} className="p-4 flex items-center justify-between hover:bg-zinc-800/50 transition-colors">
                  <div className="flex flex-col">
                    <span className="font-medium text-white text-sm">{room.name}</span>
                    <span className="text-zinc-500 text-xs mt-0.5">
                      <Monitor className="w-3 h-3 inline mr-1" />
                      Desktop: {room.marker_left || "–"}, {room.marker_top || "–"}
                    </span>
                    <span className="text-zinc-500 text-xs mt-0.5">
                      <Smartphone className="w-3 h-3 inline mr-1" />
                      Mobile: {room.marker_mobile_left || "–"}, {room.marker_mobile_top || "–"}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => handleOpenDialog(room)} className="h-8 w-8 p-0 text-zinc-400 hover:text-white">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => confirmDelete(room.id)} className="h-8 w-8 p-0 text-red-500/70 hover:text-red-400 hover:bg-red-500/10">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); setIsMappingMode(false); }}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{form.id ? "Edit Marker" : "Tambah Marker Baru"}</DialogTitle>
            <DialogDescription className="text-zinc-400">Isi detail marker dan atur koordinat posisinya di gambar blueprint kos.</DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name" className="text-zinc-300">Nama Marker *</Label>
              <Input id="name" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} className="bg-zinc-800 border-zinc-700 text-white" placeholder="Contoh: Kamar Mandi, Balkon" />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="desc" className="text-zinc-300">Deskripsi</Label>
              <Textarea id="desc" value={form.description || ""} onChange={(e) => setForm({...form, description: e.target.value})} className="bg-zinc-800 border-zinc-700 text-white" placeholder="Detail ruangan..." />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="img" className="text-zinc-300">URL Gambar (Opsional)</Label>
                <Input id="img" value={form.image_url || ""} onChange={(e) => setForm({...form, image_url: e.target.value})} className="bg-zinc-800 border-zinc-700 text-white" placeholder="/images/balkon.jpg" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="vid" className="text-zinc-300">URL Video (Opsional)</Label>
                <Input id="vid" value={form.video_url || ""} onChange={(e) => setForm({...form, video_url: e.target.value})} className="bg-zinc-800 border-zinc-700 text-white" placeholder="https://youtube.com/..." />
              </div>
            </div>

            {/* Desktop Coordinates */}
            <div className="p-4 bg-zinc-800/50 rounded-lg border border-zinc-700 mt-2">
              <div className="flex items-center justify-between mb-3">
                <Label className="font-semibold text-zinc-200 flex items-center gap-2">
                  <Monitor className="w-4 h-4" /> Koordinat Desktop
                </Label>
                <Button 
                  size="sm" 
                  variant={isMappingMode && viewMode === "desktop" ? "default" : "secondary"} 
                  onClick={() => { setViewMode("desktop"); setIsMappingMode(!(isMappingMode && viewMode === "desktop")); }}
                  className={isMappingMode && viewMode === "desktop" ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-zinc-700 hover:bg-zinc-600 text-zinc-200"}
                  type="button"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  {isMappingMode && viewMode === "desktop" ? "Tutup Mapping" : "Mode Mapping"}
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label className="text-zinc-400 text-xs">Top (Y)</Label>
                  <Input value={form.marker_top || ""} onChange={(e) => setForm({...form, marker_top: e.target.value})} className="bg-zinc-800 border-zinc-700 text-white h-8" placeholder="50%" />
                </div>
                <div className="grid gap-2">
                  <Label className="text-zinc-400 text-xs">Left (X)</Label>
                  <Input value={form.marker_left || ""} onChange={(e) => setForm({...form, marker_left: e.target.value})} className="bg-zinc-800 border-zinc-700 text-white h-8" placeholder="50%" />
                </div>
              </div>
            </div>

            {/* Mobile Coordinates */}
            <div className="p-4 bg-zinc-800/50 rounded-lg border border-purple-700/50 mt-1">
              <div className="flex items-center justify-between mb-3">
                <Label className="font-semibold text-zinc-200 flex items-center gap-2">
                  <Smartphone className="w-4 h-4" /> Koordinat Mobile
                </Label>
                <Button 
                  size="sm" 
                  variant={isMappingMode && viewMode === "mobile" ? "default" : "secondary"} 
                  onClick={() => { setViewMode("mobile"); setIsMappingMode(!(isMappingMode && viewMode === "mobile")); }}
                  className={isMappingMode && viewMode === "mobile" ? "bg-purple-600 hover:bg-purple-700 text-white" : "bg-zinc-700 hover:bg-zinc-600 text-zinc-200"}
                  type="button"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  {isMappingMode && viewMode === "mobile" ? "Tutup Mapping" : "Mode Mapping"}
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label className="text-zinc-400 text-xs">Top (Y)</Label>
                  <Input value={form.marker_mobile_top || ""} onChange={(e) => setForm({...form, marker_mobile_top: e.target.value})} className="bg-zinc-800 border-zinc-700 text-white h-8" placeholder="50%" />
                </div>
                <div className="grid gap-2">
                  <Label className="text-zinc-400 text-xs">Left (X)</Label>
                  <Input value={form.marker_mobile_left || ""} onChange={(e) => setForm({...form, marker_mobile_left: e.target.value})} className="bg-zinc-800 border-zinc-700 text-white h-8" placeholder="50%" />
                </div>
              </div>
            </div>

            <p className="text-xs text-zinc-500">* Gunakan Mode Mapping untuk menekan titik gambar secara interaktif, atau isi koordinat secara manual.</p>
          </div>
          
          <DialogFooter>
            <Button variant="ghost" onClick={() => { setIsDialogOpen(false); setIsMappingMode(false); }} className="text-zinc-400 hover:text-white">Batal</Button>
            <Button onClick={handleSave} disabled={saving} className="bg-white text-black hover:bg-zinc-200 font-semibold">
              {saving ? "Menyimpan..." : "Simpan Form Marker"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent className="bg-zinc-900 border-zinc-800 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Marker?</AlertDialogTitle>
            <AlertDialogDescription className="text-zinc-400">
              Marker ini akan dihapus secara permanen dari layout kos. Aksi ini tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700">Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white">
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
