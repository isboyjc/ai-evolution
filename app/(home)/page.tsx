import Link from 'next/link';
import Hero from './components/Hero';

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center">
      <Hero />

      <Link
        href="/book"
        className="text-fd-foreground font-semibold underline"
      >
        点击阅读
      </Link>
    </main>
  );
}
