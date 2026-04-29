import { useTranslation } from "react-i18next";
import { Landmark } from "lucide-react";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="w-full border-t bg-muted/40 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex items-center gap-2">
            <Landmark className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">ActionPath</span>
          </div>
          <p className="text-sm text-muted-foreground text-center max-w-md">
            {t("hero.subheadline")}
          </p>
          <div className="text-sm text-muted-foreground pt-4">
            {t("footer.credit")}
          </div>
        </div>
      </div>
    </footer>
  );
}
