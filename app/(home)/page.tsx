import Link from 'next/link';
import TextPressure from '@/components/TextPressure';

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center">
      <div className="relative px-5 my-5 w-full 2xl:w-5/7 xl:w-2/3 md:w-1/2 sm:w-full">
        <TextPressure
          text="75 years"
          flex={true}
          alpha={false}
          stroke={false}
          width={true}
          weight={true}
          italic={true}
          minFontSize={36}
        />
        <TextPressure
          text="artificial  intelligence"
          flex={true}
          alpha={false}
          stroke={false}
          width={true}
          weight={true}
          italic={true}
          minFontSize={36}
        />
      </div>

      <Link
        href="/book/ai-evolution"
        className="text-fd-foreground font-semibold underline"
      >
        点击阅读
      </Link>
    </main>
  );
}
