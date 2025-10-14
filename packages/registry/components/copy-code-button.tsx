import { Check, Terminal } from "lucide-react";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { Button } from "./ui/button";

export function CopyCodeButton({
  code,
  title,
}: {
  code: string;
  title: string;
}) {
  const { isCopied, copyToClipboard } = useCopyToClipboard();
  return (
    <Button
      variant="outline"
      className="w-fit gap-1 px-2 shadow-none cursor-pointer"
      title={code}
      size="sm"
      onClick={() => {
        copyToClipboard(code);
      }}
    >
      {isCopied ? <Check /> : <Terminal color="gray" />}
      <span className="text-xs text-muted-foreground text-uppercase font-mono text-nowrap">
        {isCopied ? "Copied" : title}
      </span>
    </Button>
  );
}
