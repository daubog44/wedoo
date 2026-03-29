import type { CSSProperties, SVGProps } from "react";
import { useId } from "react";
import { majesticonsMap, type MajesticonName } from "./majesticons-map";

type AppIconProps = Omit<SVGProps<SVGSVGElement>, "name"> & {
  name: MajesticonName;
};

function scopeIds(body: string, suffix: string) {
  return body
    .replace(/id="([^"]+)"/g, (_match, id) => `id="${id}-${suffix}"`)
    .replace(/url\(#([^)]+)\)/g, (_match, id) => `url(#${id}-${suffix})`);
}

export function AppIcon({
  className,
  height,
  name,
  style,
  width,
  ...props
}: AppIconProps) {
  const icon = majesticonsMap[name];
  const scope = useId().replace(/:/g, "");
  const svgStyle = style as CSSProperties | undefined;

  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      height={height ?? icon.height}
      style={svgStyle}
      viewBox={`0 0 ${icon.width} ${icon.height}`}
      width={width ?? icon.width}
      {...props}
      dangerouslySetInnerHTML={{ __html: scopeIds(icon.body, scope) }}
    />
  );
}
