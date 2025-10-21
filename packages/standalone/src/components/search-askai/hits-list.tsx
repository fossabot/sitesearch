/** biome-ignore-all lint/a11y/useFocusableInteractive: hand crafted interactions */
/** biome-ignore-all lint/a11y/useSemanticElements: . */
/** biome-ignore-all lint/a11y/useSemanticElements: hand crafted interactions */

import { memo, useMemo } from "react";
import { Highlight } from "react-instantsearch";
import type { HitsAttributesMapping, SearchHit } from "../types";
import { toAttributePath } from "../types";
import { SparklesIcon } from "./icons";

interface HitsActionsProps {
  query: string;
  isSelected: boolean;
  onAskAI: () => void;
}

const HitsActions = memo(function HitsActions({
  query,
  isSelected,
  onAskAI,
}: HitsActionsProps) {
  return (
    <div className="ss-infinite-hits-list">
      <article
        onClick={onAskAI}
        className="ss-infinite-hits-item ss-ask-ai-btn"
        aria-label="Ask AI"
        title="Ask AI"
        // biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: hand crafted
        role="option"
        aria-selected={isSelected}
      >
        <SparklesIcon />
        <p className="ss-infinite-hits-item-title">
          Ask AI: <span className="ais-Highlight-highlighted">"{query}"</span>
        </p>
      </article>
    </div>
  );
});

interface HitsListProps {
  hits: SearchHit[];
  query: string;
  selectedIndex: number;
  onAskAI: () => void;
  attributes?: HitsAttributesMapping;
}

export const HitsList = memo(function HitsList({
  hits,
  query,
  selectedIndex,
  onAskAI,
  attributes,
}: HitsListProps) {
  const mapping: Required<Pick<HitsAttributesMapping, "primaryText">> &
    Partial<HitsAttributesMapping> = useMemo(
    () => ({
      primaryText: attributes?.primaryText || "title",
      secondaryText: attributes?.secondaryText || "description",
      tertiaryText: attributes?.tertiaryText,
    }),
    [attributes],
  );
  return (
    <>
      <HitsActions
        query={query}
        isSelected={selectedIndex === 0}
        onAskAI={onAskAI}
      />
      {hits.map((hit: SearchHit, idx: number) => {
        const isSel = selectedIndex === idx + 1;
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
          </a>
        );
      })}
    </>
  );
});
