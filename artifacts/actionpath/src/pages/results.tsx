import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useGetRecommendations, useListCategories } from "@workspace/api-client-react";
import { useProfileStore } from "@/lib/storage";
import { ActionCard } from "@/components/ActionCard";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal, Loader2, Sparkles, FilterX } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Link } from "wouter";

export default function Results() {
  const { t } = useTranslation();
  const [profile] = useProfileStore();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const { data: categoriesData } = useListCategories({
    query: { queryKey: ["categories"] }
  });

  const { data: recommendations, isLoading } = useGetRecommendations({
    mutation: { mutationKey: ["recommendations", profile] }
  });

  // We need to trigger the mutation on mount since we load from storage
  // Alternatively, we use TanStack query properly for fetching based on state
  // But useGetRecommendations is a MUTATION hook in the spec.
  // We'll auto-trigger it if we have a profile.
  const [hasTriggered, setHasTriggered] = useState(false);
  const triggerMutation = useGetRecommendations();

  if (profile && !hasTriggered && !triggerMutation.isPending && !triggerMutation.data) {
    setHasTriggered(true);
    triggerMutation.mutate({ data: profile });
  }

  const resultData = triggerMutation.data;
  const isFetching = triggerMutation.isPending || (!hasTriggered && !!profile);

  if (!profile) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
        <Sparkles className="h-16 w-16 text-muted-foreground mb-4 opacity-50" />
        <h2 className="text-2xl font-bold mb-2">No Profile Found</h2>
        <p className="text-muted-foreground mb-6 max-w-md">
          Please complete your profile first so we can find the best schemes for you.
        </p>
        <Button asChild size="lg">
          <Link href="/profile">Create Profile</Link>
        </Button>
      </div>
    );
  }

  if (isFetching) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
        <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
        <h2 className="text-2xl font-bold mb-2 animate-pulse">Analyzing your profile...</h2>
        <p className="text-muted-foreground max-w-md">
          Matching you with hundreds of government schemes, scholarships, and opportunities.
        </p>
      </div>
    );
  }

  const items = resultData?.items || [];
  
  const filteredItems = items.filter(item => {
    if (activeCategory && item.category !== activeCategory) return false;
    if (search) {
      const q = search.toLowerCase();
      return item.title.toLowerCase().includes(q) || 
             item.description.toLowerCase().includes(q) ||
             item.tags.some(t => t.toLowerCase().includes(q));
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-muted/5 pb-20">
      {/* Header Banner */}
      <div className="bg-primary text-primary-foreground py-12 px-4 mb-8">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{t("results.title")}</h1>
              <p className="text-primary-foreground/80 text-lg">
                We found {items.length} recommendations based on your profile.
              </p>
            </div>
            <Button variant="secondary" asChild className="rounded-full">
              <Link href="/profile">Edit Profile</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4">
        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder={t("results.search")} 
              className="pl-10 bg-background shadow-sm border-border/50"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <ScrollArea className="w-full whitespace-nowrap pb-4">
            <div className="flex w-max space-x-2">
              <Badge 
                variant={activeCategory === null ? "default" : "outline"}
                className="cursor-pointer px-4 py-1.5 text-sm rounded-full"
                onClick={() => setActiveCategory(null)}
              >
                {t("results.filterAll")}
              </Badge>
              {categoriesData?.map(cat => (
                <Badge 
                  key={cat.slug}
                  variant={activeCategory === cat.slug ? "default" : "outline"}
                  className="cursor-pointer px-4 py-1.5 text-sm rounded-full bg-background"
                  onClick={() => setActiveCategory(cat.slug)}
                >
                  {cat.label} ({cat.count})
                </Badge>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>

        {/* Results Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((action, index) => (
              <ActionCard key={action.id} action={action} index={index} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed rounded-2xl bg-background/50">
            <FilterX className="h-12 w-12 text-muted-foreground mb-4 opacity-50" />
            <h3 className="text-xl font-semibold mb-2">{t("results.empty")}</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters.</p>
            <Button variant="outline" className="mt-4" onClick={() => { setSearch(""); setActiveCategory(null); }}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
