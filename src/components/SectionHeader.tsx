import { SlidersHorizontal } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  showAll?: boolean;
  showFilter?: boolean;
}

const SectionHeader = ({ title, showAll, showFilter }: SectionHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="font-display text-xl font-bold text-foreground">{title}</h2>
      <div className="flex items-center gap-2">
        {showFilter && (
          <button className="flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 transition-colors">
            Filter <SlidersHorizontal className="h-4 w-4" />
          </button>
        )}
        {showAll && (
          <button className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
            Show all
          </button>
        )}
      </div>
    </div>
  );
};

export default SectionHeader;
