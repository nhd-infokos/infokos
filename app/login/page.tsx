import { getKosList } from "@/services/kos.service";
import LoginForm from "@/components/LoginForm";

export const metadata = {
  title: 'Log in - Nahdia Infokost',
  description: 'Log in to your Nahdia Infokost account to find the best properties.',
};

export default async function LoginPage() {
  const kosList = await getKosList();
  const images = kosList.map(kos => kos.image_url).filter(Boolean) as string[];

  // Fallback images in case the database doesn't have enough
  const fallbackImages = [
    "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1000&auto=format&fit=crop",
  ];

  const backgroundImages = images.length >= 5 ? images : [...images, ...fallbackImages];

  return <LoginForm backgroundImages={backgroundImages} />;
}
