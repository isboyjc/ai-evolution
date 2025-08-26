'use client'

import TextPressure from '@/components/TextPressure';

export default function Hero() {
  return (
    <div className="flex flex-col px-5 my-5 w-full 2xl:w-5/7 xl:w-2/3 md:w-1/2 sm:w-full box-border">
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
  )
}