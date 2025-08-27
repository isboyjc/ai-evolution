'use client'

import TextPressure from '@/components/TextPressure';

export default function Hero() {
  return (
    <div className="flex flex-col my-5 w-full box-border">
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