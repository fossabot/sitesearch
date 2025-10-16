import { h, render } from "preact";
import SearchExperience, { type SearchConfig } from "../components/search";

type InitOptions = SearchConfig & { container: string | HTMLElement };
const instances = new Map<HTMLElement, true>();

export function init({ container, ...config }: InitOptions): void {
  const el =
    typeof container === "string"
      ? (document.querySelector(container) as HTMLElement | null)
      : (container as HTMLElement | null);
  if (!el) {
    throw new Error("Container not found");
  }
  render(h(SearchExperience, { ...config }), el);
  instances.set(el, true);
}

export function destroy(container: string | HTMLElement): void {
  const el =
    typeof container === "string"
      ? (document.querySelector(container) as HTMLElement | null)
      : (container as HTMLElement | null);
  if (!el) return;
  render(null, el);
  instances.delete(el);
}

export default { init, destroy };
