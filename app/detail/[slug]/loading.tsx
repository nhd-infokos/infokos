export default function DetailLoading() {
  return (
    <div className="min-h-screen relative w-full bg-black text-white font-sans overflow-hidden animate-pulse">
      {/* Background placeholder */}
      <div className="absolute inset-0 z-0 bg-zinc-900" />

      {/* Navbar skeleton */}
      <nav className="relative z-50 flex items-center justify-between px-6 md:px-[50px] py-6 w-full">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-zinc-800" />
          <div className="w-40 h-6 rounded bg-zinc-800" />
        </div>
        <div className="hidden sm:flex items-center gap-8">
          <div className="w-12 h-4 rounded bg-zinc-800" />
          <div className="w-12 h-4 rounded bg-zinc-800" />
          <div className="w-20 h-4 rounded bg-zinc-800" />
        </div>
      </nav>

      {/* Main content skeleton */}
      <main className="relative z-20 w-full h-[calc(100vh-100px)] pointer-events-none">
        {/* Desktop Card Skeleton */}
        <div className="hidden md:flex absolute top-10 left-[50px] p-8 rounded-[24px] bg-black/40 backdrop-blur-2xl border border-white/20 w-[420px] flex-col gap-4">
          {/* Title */}
          <div className="w-3/4 h-7 rounded bg-zinc-700" />
          
          {/* Address */}
          <div className="w-full h-4 rounded bg-zinc-800" />
          <div className="w-2/3 h-4 rounded bg-zinc-800" />
          
          {/* Tags */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="w-24 h-4 rounded bg-zinc-800" />
            <div className="w-20 h-4 rounded bg-zinc-800" />
            <div className="w-28 h-4 rounded bg-zinc-800" />
            <div className="w-16 h-4 rounded bg-zinc-800" />
          </div>

          {/* Facilities title */}
          <div className="w-24 h-6 rounded bg-zinc-700 mt-4" />
          <div className="flex flex-wrap gap-4">
            <div className="w-20 h-4 rounded bg-zinc-800" />
            <div className="w-16 h-4 rounded bg-zinc-800" />
            <div className="w-24 h-4 rounded bg-zinc-800" />
            <div className="w-20 h-4 rounded bg-zinc-800" />
            <div className="w-16 h-4 rounded bg-zinc-800" />
          </div>

          {/* Map placeholder */}
          <div className="w-24 h-6 rounded bg-zinc-700 mt-4" />
          <div className="w-full h-[150px] rounded-xl bg-zinc-800" />
          
          {/* Divider */}
          <div className="h-px w-full bg-white/10 my-2" />
          
          {/* Price */}
          <div className="flex justify-between items-center">
            <div className="w-24 h-4 rounded bg-zinc-800" />
            <div className="w-32 h-7 rounded bg-zinc-700" />
          </div>

          {/* CTA */}
          <div className="flex justify-between items-center">
            <div className="w-48 h-4 rounded bg-zinc-800" />
            <div className="w-9 h-9 rounded-full bg-zinc-800" />
          </div>
        </div>

        {/* Mobile Button Skeleton */}
        <div className="md:hidden absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="px-8 py-3.5 rounded-full bg-black/40 backdrop-blur-2xl border border-white/20 w-44 h-12" />
        </div>
      </main>
    </div>
  );
}
