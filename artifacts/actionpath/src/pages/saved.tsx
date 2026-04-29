import { useTranslation } from "react-i18next";
import { useListActions } from "@workspace/api-client-react";
import { useSavedActions, useCompletedActions } from "@/lib/storage";
import { ActionCard } from "@/components/ActionCard";
import { BookmarkX, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Saved() {
  const { t } = useTranslation();
  const { saved } = useSavedActions();
  const { completed } = useCompletedActions();
  
  // Combine sets and deduplicate to fetch all needed items
  const allIds = Array.from(new Set([...saved, ...completed]));

  // It's more efficient to fetch all actions and filter client-side than firing 10+ useGetAction hooks
  const { data: actionsData, isLoading } = useListActions(
    {}, 
    { query: { queryKey: ["actions-all"] } }
  );

  const displayedActions = actionsData?.items.filter(a => allIds.includes(a.id)) || [];

  return (
    <div className="min-h-screen bg-muted/5 py-12">
      <div className="container mx-auto max-w-6xl px-4">
        
        <div className="mb-10 space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{t("saved.title")}</h1>
          <p className="text-lg text-muted-foreground">
            {t("saved.description")}
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : displayedActions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedActions.map((action, index) => (
              <ActionCard key={action.id} action={action} index={index} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center border-2 border-dashed rounded-2xl bg-background/50">
            <BookmarkX className="h-12 w-12 text-muted-foreground mb-4 opacity-50" />
            <h3 className="text-xl font-semibold mb-2">{t("saved.empty")}</h3>
            <p className="text-muted-foreground mb-6 max-w-sm">
              When you save or complete an action plan, it will appear here.
            </p>
            <Button asChild>
              <Link href="/explore">Browse Actions</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
