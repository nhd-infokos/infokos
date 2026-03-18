"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

function generateSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
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
    kos_type: "campur", gender_label: "", target_tenant: "",
    nearby_transport: "", nearby_mall: "", whatsapp_number: "",
    image_url: "", image_mobile_url: "",
    is_published: true, is_featured: false,
  });

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
          kos_type: data.kos_type || "campur", gender_label: data.gender_label || "",
          target_tenant: data.target_tenant || "",
          nearby_transport: data.nearby_transport || "", nearby_mall: data.nearby_mall || "",
          whatsapp_number: data.whatsapp_number || "",
          image_url: data.image_url || "", image_mobile_url: data.image_mobile_url || "",
          is_published: data.is_published ?? true, is_featured: data.is_featured ?? false,
        });
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
      toast.success(isEdit ? "Kos berhasil diupdate" : "Kos berhasil dibuat");
      router.push("/admin/kos");
      router.refresh();
    } catch {
      toast.error("Gagal menyimpan data kos");
    } finally {
      setSaving(false);
    }
  };

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
              <Label className="text-zinc-300">Gender Label</Label>
              <Input value={form.gender_label} onChange={(e) => handleChange("gender_label", e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-white" placeholder="Campur" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-zinc-300">Target Penyewa</Label>
              <Input value={form.target_tenant} onChange={(e) => handleChange("target_tenant", e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-white" placeholder="Profesional" />
            </div>
            <div className="space-y-2">
              <Label className="text-zinc-300">WhatsApp Number</Label>
              <Input value={form.whatsapp_number} onChange={(e) => handleChange("whatsapp_number", e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-white" placeholder="6281234567890" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-zinc-300">Transportasi Terdekat</Label>
              <Input value={form.nearby_transport} onChange={(e) => handleChange("nearby_transport", e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-white" placeholder="6 min Krl Tebet" />
            </div>
            <div className="space-y-2">
              <Label className="text-zinc-300">Mal Terdekat</Label>
              <Input value={form.nearby_mall} onChange={(e) => handleChange("nearby_mall", e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-white" placeholder="Mall Kokas" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Media */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader><CardTitle className="text-lg text-white">Media</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-zinc-300">Image URL</Label>
            <Input value={form.image_url} onChange={(e) => handleChange("image_url", e.target.value)}
              className="bg-zinc-800 border-zinc-700 text-white" placeholder="/kos-palbatu.png" />
          </div>
          <div className="space-y-2">
            <Label className="text-zinc-300">Image Mobile URL</Label>
            <Input value={form.image_mobile_url} onChange={(e) => handleChange("image_mobile_url", e.target.value)}
              className="bg-zinc-800 border-zinc-700 text-white" placeholder="/Pal Batu 271-mobile.png" />
          </div>
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
