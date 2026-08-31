import type { ImgHTMLAttributes } from 'react';

type TestImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  fill?: boolean;
  priority?: boolean;
  unoptimized?: boolean;
};

export default function TestImage({
  alt = '',
  fill: _fill,
  priority: _priority,
  unoptimized: _unoptimized,
  ...props
}: TestImageProps) {
  // oxlint-disable-next-line next/no-img-element -- Test-only stand-in for next/image.
  return <img alt={alt} {...props} />;
}
