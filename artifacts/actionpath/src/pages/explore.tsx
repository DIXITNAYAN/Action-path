import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useListActions, useListCategories } from "@workspace/api-client-react";
import { ActionCard } from "@/components/ActionCard";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Loader2 } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function Explore() {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const { data: categoriesData } = useListCategories({
    query: { queryKey: ["categories"] }
  });

  const { data: actionsData, isLoading } = useListActions(
    { category: activeCategory || undefined, search: search || undefined },
    { query: { queryKey: ["actions", activeCategory, search] } }
  );

  return (
    <div className="min-h-screen bg-muted/5 py-12">
      <div className="container mx-auto max-w-6xl px-4">
        
        <div className="mb-10 space-y-4 text-center max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight">{t("explore.title")}</h1>
          <p className="text-lg text-muted-foreground">
            {t("explore.description")}
          </p>
        </div>

        {/* Filters */}
        <div className="mb-10 space-y-6">
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder={t("results.search")} 
              className="pl-12 h-14 rounded-full bg-background shadow-sm text-lg border-border/50 focus-visible:ring-primary/20"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <ScrollArea className="w-full whitespace-nowrap pb-4">
            <div className="flex w-max space-x-2 mx-auto">
              <Badge 
                variant={activeCategory === null ? "default" : "outline"}
                className="cursor-pointer px-5 py-2 text-sm rounded-full"
                onClick={() => setActiveCategory(null)}
              >
                {t("results.filterAll")}
              </Badge>
              {categoriesData?.map(cat => (
                <Badge 
                  key={cat.slug}
                  variant={activeCategory === cat.slug ? "default" : "outline"}
                  className="cursor-pointer px-5 py-2 text-sm rounded-full bg-background hover:bg-muted"
                  onClick={() => setActiveCategory(cat.slug)}
                >
                  {cat.label} ({cat.count})
                </Badge>
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="hidden" />
          </ScrollArea>
        </div>

        {/* Results Grid */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {actionsData?.items.map((action, index) => (
              <ActionCard key={action.id} action={action} index={index} />
            ))}
          </div>
        )}

        {!isLoading && actionsData?.items.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            {t("results.empty")}
          </div>
        )}
      </div>
    </div>
  );
}
