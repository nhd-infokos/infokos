"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { iconMap } from "@/lib/icon-map";
import type { KosTag, KosFacility } from "@/types/kos";
import Image from "next/image";

function generateSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1048576).toFixed(1)} MB`;
}

interface ImageUploadFieldProps {
  label: string;
  description: string;
  value: string;
  onChange: (url: string) => void;
  type: string;
  kosId?: string;
}

function ImageUploadField({ label, description, value, onChange, type, kosId }: ImageUploadFieldProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadedSize, setUploadedSize] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('File harus berupa gambar');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error('Ukuran file maksimal 10MB');
      return;
    }

    setUploading(true);
    setUploadedSize(null);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', type);
      formData.append('kosId', kosId || 'new');

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.details || 'Upload failed');
      }

      const data = await res.json();
      onChange(data.url);
      setUploadedSize(data.size);
      toast.success(`Gambar berhasil diupload (WebP, ${formatBytes(data.size)})`);
    } catch (error: any) {
      console.error('Upload error:', error);
      toast.error(`Gagal upload: ${error.message}`);
    } finally {
      setUploading(false);
    }
  }, [type, kosId, onChange]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleUpload(file);
  }, [handleUpload]);

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);

  return (
    <div className="space-y-3">
      <div>
        <Label className="text-zinc-300 text-sm font-semibold">{label}</Label>
        <p className="text-zinc-500 text-xs mt-0.5">{description}</p>
      </div>

      {/* Preview */}
      {value && (
        <div className={`relative overflow-hidden rounded-lg border border-zinc-700 bg-zinc-800 ${
          type === 'mobile' ? 'w-[160px] aspect-[9/16]' : 'w-full max-w-[280px] aspect-video'
        }`}>
          <Image src={value} alt={label} fill className="object-cover" unoptimized />
        </div>
      )}

      {/* Drop zone */}
      <div
        onClick={() => !uploading && fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`relative flex flex-col items-center justify-center gap-2 p-6 rounded-lg border-2 border-dashed cursor-pointer transition-all ${
          isDragging
            ? 'border-blue-500 bg-blue-500/10'
            : uploading
            ? 'border-zinc-600 bg-zinc-800/50 cursor-wait'
            : 'border-zinc-700 bg-zinc-800/30 hover:border-zinc-500 hover:bg-zinc-800/60'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        {uploading ? (
          <>
            <div className="w-8 h-8 border-2 border-zinc-500 border-t-white rounded-full animate-spin" />
            <span className="text-zinc-400 text-sm">Mengupload & konversi ke WebP...</span>
          </>
        ) : (
          <>
            <svg className="w-8 h-8 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-zinc-400 text-sm">Klik atau seret gambar ke sini</span>
            <span className="text-zinc-600 text-xs">PNG, JPG, WebP — maks 10MB — otomatis konversi ke WebP</span>
          </>
        )}
      </div>

      {/* Upload result info */}
      {uploadedSize && (
        <p className="text-green-400 text-xs">✓ Terkonversi ke WebP — {formatBytes(uploadedSize)}</p>
      )}

      {/* URL field (readonly after upload, editable for manual input) */}
      <div className="space-y-1">
        <Label className="text-zinc-500 text-xs">URL</Label>
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-zinc-800 border-zinc-700 text-white text-xs h-8"
          placeholder="URL otomatis terisi setelah upload, atau isi manual"
        />
      </div>
    </div>
  );
}

interface KosFormProps {
  kosId?: string; // if provided, edit mode
}

export default function KosForm({ kosId }: KosFormProps) {
  const router = useRouter();
  const isEdit = !!kosId;
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: "", slug: "", description: "", address: "", district: "", city: "",
    latitude: "", longitude: "", price: "",
    kos_type: "campur", whatsapp_number: "",
    image_url: "", image_mobile_url: "",
    is_published: true, is_featured: false,
  });

  // Tags state
  const [tags, setTags] = useState<KosTag[]>([]);
  const [tagName, setTagName] = useState("");
  const [tagIcon, setTagIcon] = useState("");
  const [addingTag, setAddingTag] = useState(false);

  // Facilities state
  const [facilities, setFacilities] = useState<KosFacility[]>([]);
  const [facilityName, setFacilityName] = useState("");
  const [facilityIcon, setFacilityIcon] = useState("");
  const [addingFacility, setAddingFacility] = useState(false);

  // Edit mode: load existing data
  useEffect(() => {
    if (!kosId) return;
    async function load() {
      const res = await fetch(`/api/admin/kos/${kosId}`);
      const { data } = await res.json();
      if (data) {
        setForm({
          name: data.name || "", slug: data.slug || "",
          description: data.description || "", address: data.address || "",
          district: data.district || "", city: data.city || "",
          latitude: data.latitude?.toString() || "", longitude: data.longitude?.toString() || "",
          price: data.price?.toString() || "",
          kos_type: data.kos_type || "campur",
          whatsapp_number: data.whatsapp_number || "",
          image_url: data.image_url || "", image_mobile_url: data.image_mobile_url || "",
          is_published: data.is_published ?? true, is_featured: data.is_featured ?? false,
        });
        setTags(data.kos_tags || []);
        setFacilities(data.kos_facilities || []);
      }
    }
    load();
  }, [kosId]);

  const handleChange = (field: string, value: string | boolean) => {
    setForm((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === "name" && !isEdit) {
        updated.slug = generateSlug(value as string);
      }
      return updated;
    });
  };

  const handleAddTag = async () => {
    if (!tagName.trim() || !tagIcon.trim()) {
      toast.error("Nama tag dan nama icon harus diisi");
      return;
    }
    if (!kosId) {
      toast.error("Simpan kos terlebih dahulu sebelum menambah tags");
      return;
    }
    // Validate icon exists
    if (!iconMap[tagIcon]) {
      toast.error(`Icon "${tagIcon}" tidak ditemukan. Pastikan nama icon Phosphor benar.`);
      return;
    }
    setAddingTag(true);
    try {
      const res = await fetch(`/api/admin/kos/${kosId}/tags`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: tagName, icon: tagIcon, sort_order: tags.length }),
      });
      if (!res.ok) throw new Error("Failed");
      const { data } = await res.json();
      setTags((prev) => [...prev, data]);
      setTagName("");
      setTagIcon("");
      toast.success("Tag berhasil ditambahkan");
    } catch {
      toast.error("Gagal menambah tag");
    } finally {
      setAddingTag(false);
    }
  };

  const handleDeleteTag = async (tagId: string) => {
    if (!kosId) return;
    try {
      const res = await fetch(`/api/admin/kos/${kosId}/tags`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: tagId }),
      });
      if (!res.ok) throw new Error("Failed");
      setTags((prev) => prev.filter((t) => t.id !== tagId));
      toast.success("Tag berhasil dihapus");
    } catch {
      toast.error("Gagal menghapus tag");
    }
  };

  const handleAddFacility = async () => {
    if (!facilityName.trim() || !facilityIcon.trim()) {
      toast.error("Nama fasilitas dan nama icon harus diisi");
      return;
    }
    if (!kosId) {
      toast.error("Simpan kos terlebih dahulu sebelum menambah fasilitas");
      return;
    }
    if (!iconMap[facilityIcon]) {
      toast.error(`Icon "${facilityIcon}" tidak ditemukan. Pastikan nama icon Phosphor benar.`);
      return;
    }
    setAddingFacility(true);
    try {
      const res = await fetch(`/api/admin/kos/${kosId}/facilities`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: facilityName, icon: facilityIcon, sort_order: facilities.length }),
      });
      if (!res.ok) throw new Error("Failed");
      const { data } = await res.json();
      setFacilities((prev) => [...prev, data]);
      setFacilityName("");
      setFacilityIcon("");
      toast.success("Fasilitas berhasil ditambahkan");
    } catch {
      toast.error("Gagal menambah fasilitas");
    } finally {
      setAddingFacility(false);
    }
  };

  const handleDeleteFacility = async (facilityId: string) => {
    if (!kosId) return;
    try {
      const res = await fetch(`/api/admin/kos/${kosId}/facilities`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: facilityId }),
      });
      if (!res.ok) throw new Error("Failed");
      setFacilities((prev) => prev.filter((f) => f.id !== facilityId));
      toast.success("Fasilitas berhasil dihapus");
    } catch {
      toast.error("Gagal menghapus fasilitas");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      ...form,
      price: parseInt(form.price, 10) || 0,
      latitude: form.latitude ? parseFloat(form.latitude) : null,
      longitude: form.longitude ? parseFloat(form.longitude) : null,
    };

    try {
      const url = isEdit ? `/api/admin/kos/${kosId}` : "/api/admin/kos";
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed");
      const responseData = await res.json();
      toast.success(isEdit ? "Kos berhasil diupdate" : "Kos berhasil dibuat! Silakan lengkapi tags, fasilitas, dan marker.");
      if (!isEdit && responseData?.data?.id) {
        // Redirect to edit page so user can add tags, facilities, markers
        router.push(`/admin/kos/${responseData.data.id}/edit`);
      } else {
        router.push("/admin/kos");
      }
      router.refresh();
    } catch {
      toast.error("Gagal menyimpan data kos");
    } finally {
      setSaving(false);
    }
  };

  // Get preview icon component
  const PreviewIcon = tagIcon ? iconMap[tagIcon] : null;
  const PreviewFacilityIcon = facilityIcon ? iconMap[facilityIcon] : null;

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{isEdit ? "Edit Kos" : "Tambah Kos Baru"}</h1>
          <p className="text-zinc-400 text-sm mt-1">{isEdit ? "Perbarui informasi kos" : "Isi detail properti kos baru"}</p>
        </div>
        <div className="flex gap-2">
          <Button type="button" variant="ghost" onClick={() => router.back()} className="text-zinc-400 hover:text-white">Batal</Button>
          <Button type="submit" disabled={saving} className="bg-white text-black hover:bg-zinc-200 font-semibold">
            {saving ? "Menyimpan..." : "Simpan"}
          </Button>
        </div>
      </div>

      {/* Informasi Dasar */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader><CardTitle className="text-lg text-white">Informasi Dasar</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-zinc-300">Nama Kos *</Label>
              <Input value={form.name} onChange={(e) => handleChange("name", e.target.value)} required
                className="bg-zinc-800 border-zinc-700 text-white" placeholder="Kos Pal Batu 271" />
            </div>
            <div className="space-y-2">
              <Label className="text-zinc-300">Slug *</Label>
              <Input value={form.slug} onChange={(e) => handleChange("slug", e.target.value)} required
                className="bg-zinc-800 border-zinc-700 text-white" placeholder="kos-pal-batu-271" />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-zinc-300">Deskripsi</Label>
            <Textarea value={form.description} onChange={(e) => handleChange("description", e.target.value)}
              className="bg-zinc-800 border-zinc-700 text-white min-h-[80px]" placeholder="Deskripsi properti kos..." />
          </div>
          <div className="space-y-2">
            <Label className="text-zinc-300">Harga per Bulan (Rp) *</Label>
            <Input type="number" value={form.price} onChange={(e) => handleChange("price", e.target.value)} required
              className="bg-zinc-800 border-zinc-700 text-white" placeholder="1850000" />
          </div>
        </CardContent>
      </Card>

      {/* Lokasi */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader><CardTitle className="text-lg text-white">Lokasi</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-zinc-300">Alamat Lengkap</Label>
            <Input value={form.address} onChange={(e) => handleChange("address", e.target.value)}
              className="bg-zinc-800 border-zinc-700 text-white" placeholder="Jl. Pal Batu 2 No.71..." />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-zinc-300">Kecamatan</Label>
              <Input value={form.district} onChange={(e) => handleChange("district", e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-white" placeholder="Tebet" />
            </div>
            <div className="space-y-2">
              <Label className="text-zinc-300">Kota</Label>
              <Input value={form.city} onChange={(e) => handleChange("city", e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-white" placeholder="Jakarta Selatan" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-zinc-300">Latitude</Label>
              <Input type="number" step="any" value={form.latitude} onChange={(e) => handleChange("latitude", e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-white" placeholder="-6.2615" />
            </div>
            <div className="space-y-2">
              <Label className="text-zinc-300">Longitude</Label>
              <Input type="number" step="any" value={form.longitude} onChange={(e) => handleChange("longitude", e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-white" placeholder="106.8106" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Klasifikasi & Tags */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader><CardTitle className="text-lg text-white">Klasifikasi & Tags</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-zinc-300">Tipe Kos</Label>
              <select value={form.kos_type} onChange={(e) => handleChange("kos_type", e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-md px-3 py-2 text-sm">
                <option value="putra">Putra</option>
                <option value="putri">Putri</option>
                <option value="campur">Campur</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label className="text-zinc-300">WhatsApp Number</Label>
              <Input value={form.whatsapp_number} onChange={(e) => handleChange("whatsapp_number", e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-white" placeholder="6281234567890" />
            </div>
          </div>

          {/* Dynamic Tags Section */}
          <Separator className="bg-zinc-800 my-2" />
          <div className="space-y-3">
            <Label className="text-zinc-300 text-base font-semibold">Tags Dinamis</Label>
            <p className="text-zinc-500 text-xs">Tambah tags dengan nama dan icon Phosphor. Contoh icon: GenderIntersex, Train, BagSimple, ShoppingBag, MapPin, Coffee, dll.</p>

            {!isEdit ? (
              <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-4">
                <p className="text-amber-400 text-sm">⚠️ Simpan kos terlebih dahulu. Setelah disimpan, Anda akan diarahkan ke halaman edit untuk menambahkan tags, fasilitas, dan marker.</p>
              </div>
            ) : (
              <>
                {/* Add tag form */}
                <div className="flex gap-2 items-end">
                  <div className="flex-1 space-y-1">
                    <Label className="text-zinc-400 text-xs">Nama Tag</Label>
                    <Input
                      value={tagName}
                      onChange={(e) => setTagName(e.target.value)}
                      className="bg-zinc-800 border-zinc-700 text-white"
                      placeholder="Contoh: Putra"
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <Label className="text-zinc-400 text-xs">Nama Icon Phosphor</Label>
                    <div className="relative">
                      <Input
                        value={tagIcon}
                        onChange={(e) => setTagIcon(e.target.value)}
                        className="bg-zinc-800 border-zinc-700 text-white pr-10"
                        placeholder="Contoh: GenderIntersex"
                      />
                      {/* Live preview icon */}
                      {PreviewIcon && (
                        <div className="absolute right-2 top-1/2 -translate-y-1/2">
                          <PreviewIcon className="w-5 h-5 text-green-400" weight="duotone" />
                        </div>
                      )}
                    </div>
                  </div>
                  <Button
                    type="button"
                    onClick={handleAddTag}
                    disabled={addingTag}
                    className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 shrink-0"
                  >
                    {addingTag ? "..." : "Tambah"}
                  </Button>
                </div>

                {/* Tags list */}
                {tags.length > 0 && (
                  <div className="space-y-2 mt-3">
                    {tags.map((tag) => {
                      const TagIcon = iconMap[tag.icon];
                      return (
                        <div
                          key={tag.id}
                          className="flex items-center justify-between bg-zinc-800/80 border border-zinc-700 rounded-lg px-3 py-2"
                        >
                          <div className="flex items-center gap-3">
                            {TagIcon && <TagIcon className="w-5 h-5 text-white" weight="duotone" />}
                            <span className="text-white text-sm font-medium">{tag.name}</span>
                            <span className="text-zinc-500 text-xs">({tag.icon})</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleDeleteTag(tag.id)}
                            className="text-red-400 hover:text-red-300 text-xs font-medium hover:bg-red-400/10 px-2 py-1 rounded transition-colors"
                          >
                            Hapus
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}

                {tags.length === 0 && (
                  <p className="text-zinc-600 text-xs italic">Belum ada tags. Tambahkan tags untuk ditampilkan di halaman depan.</p>
                )}
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Fasilitas Kos */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader><CardTitle className="text-lg text-white">Fasilitas Kos</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <p className="text-zinc-500 text-xs">Tambah fasilitas kos dengan nama dan icon Phosphor. Contoh icon: Bed, Bathtub, Television, Wind, WifiHigh, Thermometer, Shower, dll.</p>

          {!isEdit ? (
            <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-4">
              <p className="text-amber-400 text-sm">⚠️ Simpan kos terlebih dahulu. Setelah disimpan, Anda akan diarahkan ke halaman edit untuk menambahkan fasilitas.</p>
            </div>
          ) : (
            <>
              {/* Add facility form */}
              <div className="flex gap-2 items-end">
                <div className="flex-1 space-y-1">
                  <Label className="text-zinc-400 text-xs">Nama Fasilitas</Label>
                  <Input
                    value={facilityName}
                    onChange={(e) => setFacilityName(e.target.value)}
                    className="bg-zinc-800 border-zinc-700 text-white"
                    placeholder="Contoh: Kasur"
                  />
                </div>
                <div className="flex-1 space-y-1">
                  <Label className="text-zinc-400 text-xs">Nama Icon Phosphor</Label>
                  <div className="relative">
                    <Input
                      value={facilityIcon}
                      onChange={(e) => setFacilityIcon(e.target.value)}
                      className="bg-zinc-800 border-zinc-700 text-white pr-10"
                      placeholder="Contoh: Bed"
                    />
                    {PreviewFacilityIcon && (
                      <div className="absolute right-2 top-1/2 -translate-y-1/2">
                        <PreviewFacilityIcon className="w-5 h-5 text-blue-400" weight="duotone" />
                      </div>
                    )}
                  </div>
                </div>
                <Button
                  type="button"
                  onClick={handleAddFacility}
                  disabled={addingFacility}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 shrink-0"
                >
                  {addingFacility ? "..." : "Tambah"}
                </Button>
              </div>

              {/* Facilities list */}
              {facilities.length > 0 && (
                <div className="space-y-2 mt-3">
                  {facilities.map((f) => {
                    const FIcon = f.icon ? iconMap[f.icon] : null;
                    return (
                      <div
                        key={f.id}
                        className="flex items-center justify-between bg-zinc-800/80 border border-zinc-700 rounded-lg px-3 py-2"
                      >
                        <div className="flex items-center gap-3">
                          {FIcon && <FIcon className="w-5 h-5 text-white" weight="bold" />}
                          <span className="text-white text-sm font-medium">{f.name}</span>
                          <span className="text-zinc-500 text-xs">({f.icon})</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleDeleteFacility(f.id)}
                          className="text-red-400 hover:text-red-300 text-xs font-medium hover:bg-red-400/10 px-2 py-1 rounded transition-colors"
                        >
                          Hapus
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}

              {facilities.length === 0 && (
                <p className="text-zinc-600 text-xs italic">Belum ada fasilitas. Tambahkan fasilitas untuk ditampilkan di halaman detail kos.</p>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Media */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader><CardTitle className="text-lg text-white">Media</CardTitle></CardHeader>
        <CardContent className="space-y-6">
          {/* Desktop Image */}
          <ImageUploadField
            label="Gambar Desktop"
            description="Gambar utama kos untuk tampilan desktop (landscape)"
            value={form.image_url}
            onChange={(url) => handleChange("image_url", url)}
            type="desktop"
            kosId={kosId}
          />

          {/* Mobile Image */}
          <ImageUploadField
            label="Gambar Mobile"
            description="Gambar kos untuk tampilan mobile (portrait)"
            value={form.image_mobile_url}
            onChange={(url) => handleChange("image_mobile_url", url)}
            type="mobile"
            kosId={kosId}
          />
        </CardContent>
      </Card>

      {/* Status */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader><CardTitle className="text-lg text-white">Status</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-zinc-300">Published</Label>
              <p className="text-zinc-500 text-xs mt-0.5">Tampilkan kos di halaman publik</p>
            </div>
            <Switch checked={form.is_published} onCheckedChange={(v) => handleChange("is_published", v)} />
          </div>
          <Separator className="bg-zinc-800" />
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-zinc-300">Featured</Label>
              <p className="text-zinc-500 text-xs mt-0.5">Tampilkan di hero section halaman utama</p>
            </div>
            <Switch checked={form.is_featured} onCheckedChange={(v) => handleChange("is_featured", v)} />
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
