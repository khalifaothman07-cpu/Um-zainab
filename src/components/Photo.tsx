import type { PhotoAsset, PlaceholderVariant } from "../data/site";

/**
 * Renders a real photo when one is supplied. When no image asset exists for
 * a slot, this renders nothing at all rather than a "photo coming soon"
 * placeholder — callers are responsible for adding a `no-photo` class to
 * their wrapping element so the layout collapses gracefully instead of
 * leaving an empty gap.
 */
export function Photo({
  variant,
  index,
  priority = false,
  className = "",
  image,
}: {
  variant: PlaceholderVariant;
  index?: number;
  priority?: boolean;
  className?: string;
  image?: PhotoAsset;
}) {
  if (!image) return null;

  return (
    <div
      className={`photo-placeholder photo-real photo-${variant} ${className}`}
      data-priority={priority || undefined}
    >
      {index ? <b className="photo-index">0{index}</b> : null}
      <img
        className="photo-image"
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
        style={
          image.objectPosition ? { objectPosition: image.objectPosition } : undefined
        }
      />
    </div>
  );
}
