'use client';

import { Image, type ImageProps } from 'fumadocs-core/framework';
import { type ImgHTMLAttributes } from 'react';
import './image-zoom.css';
import Zoom, { type UncontrolledProps } from 'react-medium-image-zoom';

export type ImageZoomProps = ImageProps & {
  /**
   * Image props when zoom in
   */
  zoomInProps?: ImgHTMLAttributes<HTMLImageElement>;

  /**
   * Props for `react-medium-image-zoom`
   */
  rmiz?: UncontrolledProps;
};

function getImageSrc(src: ImageProps['src']): string {
  if (typeof src === 'string') return src;

  if (typeof src === 'object') {
    // Next.js
    if ('default' in src)
      return (src as { default: { src: string } }).default.src;
    return src.src;
  }

  return '';
}

export function ImageZoom({
  zoomInProps,
  children,
  rmiz,
  ...props
}: ImageZoomProps) {
  return (
    <Zoom
      zoomMargin={20}
      wrapElement="span"
      {...rmiz}
      zoomImg={{
        src: getImageSrc(props.src),
        sizes: undefined,
        ...zoomInProps,
      }}
    >
      {children ?? (
        <>
          <Image
            {...props}
            alt={props.alt || ''}
            className="my-0!"
          />
          {props?.alt && <em className="block w-full text-sm mt-2 text-gray-500 text-center">{props.alt}</em>}
        </>
      )}
    </Zoom>
  );
}