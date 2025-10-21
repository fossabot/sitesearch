/** biome-ignore-all lint/a11y/useFocusableInteractive: hand crafted interactions */
/** biome-ignore-all lint/a11y/useSemanticElements: . */
/** biome-ignore-all lint/a11y/useSemanticElements: hand crafted interactions */

import { memo, useMemo, useState } from "react";
import { Highlight } from "react-instantsearch";
import type { HitsAttributesMapping, SearchHit } from "../types";
import { getByPath, toAttributePath } from "../types";
import { SearchIcon } from "./icons";

interface HitsListProps {
  hits: SearchHit[];
  query: string;
  selectedIndex: number;
  attributes?: HitsAttributesMapping;
}

export const HitsList = memo(function HitsList({
  hits,
  selectedIndex,
  attributes,
}: HitsListProps) {
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const mapping: Required<Pick<HitsAttributesMapping, "primaryText">> &
    Partial<HitsAttributesMapping> = useMemo(
    () => ({
      primaryText: attributes?.primaryText || "title",
      secondaryText: attributes?.secondaryText || "description",
      tertiaryText: attributes?.tertiaryText,
      image: attributes?.image,
    }),
    [attributes],
  );
  return (
    <>
      {hits.map((hit: SearchHit, idx: number) => {
        const isSel = selectedIndex === idx;
        const imageUrl = getByPath<string>(hit, mapping.image);
        const primaryVal = getByPath<string>(hit, mapping.primaryText);
        const hasImage = Boolean(imageUrl);
        const isImageFailed = failedImages[hit.objectID] || !hasImage;
        return (
          <a
            key={hit.objectID}
            href={hit.url}
            target="_blank"
            rel="noopener noreferrer"
            className="ss-infinite-hits-item ss-infinite-hits-anchor"
            role="option"
            aria-selected={isSel}
          >
            {imageUrl ? (
              <div className="ss-infinite-hits-item-image-container">
                {!isImageFailed ? (
                  <img
                    src={imageUrl as string}
                    alt={primaryVal || ""}
                    className="ss-infinite-hits-item-image"
                    onError={() =>
                      setFailedImages((prev) => ({
                        ...prev,
                        [hit.objectID]: true,
                      }))
                    }
                  />
                ) : (
                  <div
                    className="ss-infinite-hits-item-placeholder"
                    aria-hidden="true"
                  >
                    <SearchIcon />
                  </div>
                )}
              </div>
            ) : null}
            <div className="ss-infinite-hits-item-content">
              <p className="ss-infinite-hits-item-title">
                <Highlight
                  attribute={toAttributePath(mapping.primaryText)}
                  hit={hit}
                />
              </p>
              <p className="ss-infinite-hits-item-description">
                {mapping.secondaryText ? (
                  <Highlight
                    attribute={toAttributePath(mapping.secondaryText)}
                    hit={hit}
                  />
                ) : null}
              </p>
              {mapping.tertiaryText ? (
                <p className="ss-infinite-hits-item-description">
                  <Highlight
                    attribute={toAttributePath(mapping.tertiaryText)}
                    hit={hit}
                  />
                </p>
              ) : null}
            </div>
          </a>
        );
      })}
    </>
  );
});
