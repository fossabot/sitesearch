"use client";
import { default as Search } from "@/components/search";
import { default as SearchWithAskAi } from "@/components/search-ai";

import { cn } from "@/lib/utils";
import { GridPattern } from "./ui/grid-pattern";

export function PreviewSiteSearch() {
  return (
    <div className="bg-background relative flex h-[400px] items-center justify-center overflow-hidden rounded-lg border p-20">
      <GridPattern
        width={40}
        height={40}
        x={-1}
        y={-1}
        className={cn(
          "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]",
        )}
      />
      <SearchWithAskAi
        applicationId="betaHAXPMHIMMC"
        apiKey="8b00405cba281a7d800ccec393e9af24"
        indexName="algolia_podcast_sample_dataset"
        assistantId="Z03Eno3oLaXI"
        placeholder="Search for podcasts..."
        hitsPerPage={6}
        keyboardShortcut="cmd+k"
        buttonText="🎧 Search Podcasts"
      />
    </div>
  );
}

export function PreviewSearchNoAskAI() {
  return (
    <div className="bg-background relative flex h-[400px] items-center justify-center overflow-hidden rounded-lg border p-20">
      <GridPattern
        width={40}
        height={40}
        x={-1}
        y={-1}
        className={cn(
          "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]",
        )}
      />
      <Search
        applicationId="betaHAXPMHIMMC"
        apiKey="8b00405cba281a7d800ccec393e9af24"
        indexName="algolia_podcast_sample_dataset"
        placeholder="Search for podcasts..."
        hitsPerPage={15}
        keyboardShortcut="cmd+k"
        buttonText="🎧 Search Podcasts"
      />
    </div>
  );
}
