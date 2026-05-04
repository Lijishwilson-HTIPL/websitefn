import { CheckCircle2 } from "lucide-react";
import clsx from "clsx";

interface CheckListProps {
  items: string[];
  columns?: 1 | 2;
  dark?: boolean;
}

export default function CheckList({ items, columns = 1, dark = false }: CheckListProps) {
  return (
    <ul
      className={clsx(
        "space-y-3",
        columns === 2 && "sm:grid sm:grid-cols-2 sm:gap-x-8 sm:space-y-0 sm:gap-y-3"
      )}
    >
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <CheckCircle2
            className={clsx(
              "w-5 h-5 shrink-0 mt-0.5",
              dark ? "text-sky-400" : "text-sky-600"
            )}
          />
          <span className={clsx("text-sm leading-relaxed", dark ? "text-slate-300" : "text-slate-600")}>
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}
