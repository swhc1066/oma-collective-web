import { cn } from "@/lib/utils";

function isIncludesLine(line: string): boolean {
  return line.trim().toLowerCase() === "includes:";
}

/**
 * Renders an auction lot description with the first line and "Includes:"
 * shown in semibold — matching the catalog copy format.
 */
export function AuctionDescription({
  description,
  className,
  lineClamp,
}: {
  description: string;
  className?: string;
  lineClamp?: 2 | 3;
}) {
  const lines = description.split("\n");
  let firstContentLine = true;

  return (
    <div
      className={cn(
        "text-base leading-relaxed text-[var(--color-bg-maroon)]/80",
        lineClamp === 2 && "line-clamp-2",
        lineClamp === 3 && "line-clamp-3",
        className,
      )}
    >
      {lines.map((line, index) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={index} className="h-3" aria-hidden="true" />;
        }

        let bold = isIncludesLine(line);
        if (firstContentLine) {
          bold = true;
          firstContentLine = false;
        }

        return (
          <span
            key={index}
            className={cn(
              "block",
              bold && "font-semibold text-[var(--color-bg-maroon)]",
              isIncludesLine(line) && "mt-4",
            )}
          >
            {line.trimEnd()}
          </span>
        );
      })}
    </div>
  );
}
