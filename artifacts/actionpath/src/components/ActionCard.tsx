import { useTranslation } from "react-i18next";
import { Action } from "@workspace/api-client-react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ExternalLink, Bookmark, CheckCircle2, BookmarkCheck, FileText, Info, Award, Building2 } from "lucide-react";
import { actionsHi } from "../i18n/actions-hi";
import { useSavedActions, useCompletedActions } from "../lib/storage";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface ActionCardProps {
  action: Action;
  index?: number;
}

export function ActionCard({ action, index = 0 }: ActionCardProps) {
  const { t, i18n } = useTranslation();
  const isHi = i18n.language === "hi";
  
  const hiData = actionsHi[action.id];
  
  const title = isHi && hiData?.title ? hiData.title : action.title;
  const description = isHi && hiData?.description ? hiData.description : action.description;
  const eligibility = isHi && hiData?.eligibility ? hiData.eligibility : action.eligibility;
  const benefit = isHi && hiData?.benefit ? hiData.benefit : action.benefit;
  const documents = isHi && hiData?.documents ? hiData.documents : action.documents;
  
  const { isSaved, toggleSaved } = useSavedActions();
  const { isCompleted, toggleCompleted } = useCompletedActions();
  
  const saved = isSaved(action.id);
  const completed = isCompleted(action.id);
  
  const handleSave = () => {
    toggleSaved(action.id);
    toast.success(saved ? t("results.toast.unsaved") : t("results.toast.saved"));
  };
  
  const handleComplete = () => {
    toggleCompleted(action.id);
    toast.success(completed ? t("results.toast.uncompleted") : t("results.toast.completed"));
  };

  const priorityColors = {
    high: "bg-destructive/10 text-destructive hover:bg-destructive/20 border-destructive/20",
    medium: "bg-secondary/20 text-secondary-foreground hover:bg-secondary/30 border-secondary/30",
    low: "bg-muted text-muted-foreground hover:bg-muted/80 border-border"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.1, 0.5) }}
    >
      <Card className={`h-full flex flex-col overflow-hidden transition-all duration-300 border-2 ${completed ? 'opacity-70 border-muted bg-muted/20' : 'hover:shadow-lg hover:border-primary/20'}`}>
        <CardHeader className="pb-4 space-y-3">
          <div className="flex justify-between items-start gap-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 font-medium">
                {action.categoryLabel}
              </Badge>
              {action.priority && (
                <Badge variant="outline" className={`${priorityColors[action.priority]} font-medium`}>
                  {t(`results.priority.${action.priority}`)}
                </Badge>
              )}
            </div>
            <div className="flex gap-1 shrink-0">
              <Button
                variant="ghost"
                size="icon"
                className={`h-8 w-8 rounded-full ${saved ? 'text-primary' : 'text-muted-foreground'}`}
                onClick={handleSave}
                title={saved ? t("results.card.saved") : t("results.card.save")}
              >
                {saved ? <BookmarkCheck className="h-5 w-5 fill-current" /> : <Bookmark className="h-5 w-5" />}
              </Button>
            </div>
          </div>
          <h3 className={`text-xl font-bold leading-tight ${completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
            {title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {description}
          </p>
        </CardHeader>
        
        <CardContent className="pb-6 flex-grow space-y-4">
          {(eligibility || benefit || action.ministry) && (
            <div className="grid grid-cols-1 gap-3 text-sm p-4 bg-muted/30 rounded-xl border border-border/50">
              {eligibility && (
                <div className="flex gap-2 items-start">
                  <Info className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-xs uppercase tracking-wider text-muted-foreground mb-0.5">{t("results.card.eligibility")}</span>
                    <span className="text-foreground/90">{eligibility}</span>
                  </div>
                </div>
              )}
              {benefit && (
                <div className="flex gap-2 items-start">
                  <Award className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-xs uppercase tracking-wider text-muted-foreground mb-0.5">{t("results.card.benefit")}</span>
                    <span className="text-foreground/90">{benefit}</span>
                  </div>
                </div>
              )}
              {action.ministry && (
                <div className="flex gap-2 items-start">
                  <Building2 className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-xs uppercase tracking-wider text-muted-foreground mb-0.5">{t("results.card.ministry")}</span>
                    <span className="text-foreground/90">{action.ministry}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {documents && documents.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <FileText className="h-3.5 w-3.5" />
                {t("results.card.documents")}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {documents.map((doc, i) => (
                  <Badge key={i} variant="secondary" className="bg-secondary/10 text-secondary-foreground font-normal border-secondary/20">
                    {doc}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="pt-0 mt-auto flex gap-3">
          <Button 
            className="flex-1 rounded-xl shadow-sm hover:shadow group" 
            asChild
          >
            <a href={action.link} target="_blank" rel="noopener noreferrer">
              {t("results.card.apply")}
              <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </Button>
          <Button 
            variant={completed ? "secondary" : "outline"} 
            className={`rounded-xl px-4 ${completed ? 'bg-green-500/10 text-green-700 hover:bg-green-500/20 border-green-500/20 dark:text-green-400' : ''}`}
            onClick={handleComplete}
          >
            <CheckCircle2 className={`h-4 w-4 ${completed ? 'mr-2' : ''}`} />
            {completed ? <span className="hidden sm:inline">{t("results.card.completed")}</span> : <span className="sr-only">{t("results.card.markComplete")}</span>}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
