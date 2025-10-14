/* eslint-disable @next/next/no-img-element */
"use client";

import { CopyCodeButton } from "@/components/copy-code-button";
import { OpenInV0Button } from "@/components/open-in-v0-button";
import { ThemeToggle } from "@/components/theme-toggle";
import Search from "@/registry/experiences/search/components";
import SearchAskAI from "@/registry/experiences/search-askai/components";

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto flex flex-col min-h-screen px-4 py-8 gap-8">
      <header className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <img
              src="/algolia.svg"
              alt="Algolia"
              className="w-32 block dark:hidden"
            />
            <img
              src="/algolia-dark.svg"
              alt="Algolia"
              className="w-32 hidden dark:block"
            />
            <p className="text-muted-foreground">
              Handcrafted registry for Algolia site search.
            </p>
          </div>
          <ThemeToggle />
        </div>
      </header>
      <main className="gap-8 grid grid-cols-1 md:grid-cols-2 flex-1">
        <div className="flex flex-col gap-4 border rounded-lg p-4 h-[100px] md:h-[320px] relative">
          <div className="flex items-center justify-between">
            <h2 className="text-sm text-muted-foreground sm:pl-3">
              Search <b className="font-bold"> with Ask AI</b>
            </h2>
            <OpenInV0Button name="search-ai" className="w-fit" />
          </div>
          <div className="flex items-center justify-center h-[100px] md:h-[300px] relative">
            <SearchAskAI
              applicationId="betaHAXPMHIMMC"
              apiKey="8b00405cba281a7d800ccec393e9af24"
              indexName="algolia_podcast_sample_dataset"
              baseAskaiUrl="https://beta-askai.algolia.com"
              assistantId="Y89iGlsnihaU"
            />
          </div>
          <div className="flex">
            <CopyCodeButton
              title="npm install command"
              code="npx shadcn@latest add https://algolia-sitesearch.netlify.app/r/search-ai.json"
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 border rounded-lg p-4 h-[100px] md:h-[320px] relative">
          <div className="flex items-center justify-between">
            <h2 className="text-sm text-muted-foreground sm:pl-3">Search</h2>
            <OpenInV0Button name="search" className="w-fit" />
          </div>
          <div className="flex items-center justify-center h-[100px] md:h-[300px] relative">
            <Search
              applicationId="betaHAXPMHIMMC"
              apiKey="8b00405cba281a7d800ccec393e9af24"
              indexName="algolia_podcast_sample_dataset"
            />
          </div>
          <div className="flex">
            <CopyCodeButton
              title="npm install command"
              code="npx shadcn@latest add https://algolia-sitesearch.netlify.app/r/search.json"
            />
          </div>
        </div>
      </main>
      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        <div className="flex-wrap">
          <p>Built with 💙 by Algolia.</p>{" "}
          <p className="flex mt-2 items-center justify-center gap-2">
            Sourced on
            <a
              href="https://github.com/algolia/sitesearch"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white"
                alt="View on GitHub"
                className="h-5"
              />
            </a>
            <span>& Edit in</span>
            <a
              href="https://codesandbox.io/p/github/algolia/sitesearch"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://img.shields.io/badge/Codesandbox-040404?style=for-the-badge&logo=codesandbox&logoColor=DBDBDB"
                alt="Edit in CodeSandbox"
                className="h-5"
              />
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
