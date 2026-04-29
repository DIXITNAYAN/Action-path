import { useTranslation } from "react-i18next";
import { Link, useLocation } from "wouter";
import { useGetFeaturedActions, useGetStats } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { ActionCard } from "@/components/ActionCard";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, ListChecks, ShieldCheck, Sparkles } from "lucide-react";

export default function Home() {
  const { t } = useTranslation();
  const [, setLocation] = useLocation();

  const { data: featuredData, isLoading: featuredLoading } = useGetFeaturedActions({
    query: { queryKey: ["featured"] }
  });

  const { data: statsData } = useGetStats({
    query: { queryKey: ["stats"] }
  });

  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Hero Section */}
      <section className="relative w-full pt-20 pb-24 md:pt-32 md:pb-36 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background -z-10" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay -z-10 pointer-events-none" />
        
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 text-secondary-foreground border border-secondary/20 text-sm font-medium mb-4">
              <Sparkles className="h-4 w-4" />
              <span>Smart Citizen Guide</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1]">
              {t("hero.headline")}
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t("hero.subheadline")}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button 
                size="lg" 
                className="w-full sm:w-auto text-base h-14 px-8 rounded-full shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all hover:-translate-y-0.5"
                onClick={() => setLocation("/profile")}
              >
                {t("hero.getStarted")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto text-base h-14 px-8 rounded-full bg-background/50 backdrop-blur-sm"
                onClick={() => setLocation("/explore")}
              >
                {t("nav.explore")}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="w-full border-y bg-muted/30 py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x border-border/50">
            <div className="flex flex-col items-center justify-center text-center pt-4 md:pt-0">
              <div className="text-4xl font-bold text-primary mb-2">
                {statsData?.totalActions || "20+"}
              </div>
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                {t("stats.totalSchemes")}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center text-center pt-8 md:pt-0">
              <div className="text-4xl font-bold text-secondary mb-2">
                {statsData?.totalCategories || "10+"}
              </div>
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                {t("stats.categories")}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center text-center pt-8 md:pt-0">
              <div className="text-4xl font-bold text-destructive mb-2">
                {statsData?.highPriorityCount || "10+"}
              </div>
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                {t("stats.highPriority")}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="w-full py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              {t("howItWorks.title")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-2xl bg-muted/20 border border-border/50">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <ListChecks className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">{t("howItWorks.step1.title")}</h3>
              <p className="text-muted-foreground leading-relaxed">{t("howItWorks.step1.desc")}</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-2xl bg-muted/20 border border-border/50">
              <div className="h-16 w-16 rounded-full bg-secondary/10 flex items-center justify-center mb-2">
                <ShieldCheck className="h-8 w-8 text-secondary-foreground" />
              </div>
              <h3 className="text-xl font-semibold">{t("howItWorks.step2.title")}</h3>
              <p className="text-muted-foreground leading-relaxed">{t("howItWorks.step2.desc")}</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-2xl bg-muted/20 border border-border/50">
              <div className="h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center mb-2">
                <CheckCircle2 className="h-8 w-8 text-destructive" />
              </div>
              <h3 className="text-xl font-semibold">{t("howItWorks.step3.title")}</h3>
              <p className="text-muted-foreground leading-relaxed">{t("howItWorks.step3.desc")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Schemes */}
      <section className="w-full py-20 bg-muted/10 border-t">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-10">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              {t("featured.title")}
            </h2>
            <Button variant="ghost" asChild className="hidden sm:flex hover:bg-transparent hover:text-primary">
              <Link href="/explore">
                View all <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {featuredLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-80 rounded-2xl bg-muted animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredData?.items.slice(0, 6).map((action, index) => (
                <ActionCard key={action.id} action={action} index={index} />
              ))}
            </div>
          )}
          
          <div className="mt-8 text-center sm:hidden">
            <Button variant="outline" asChild className="w-full">
              <Link href="/explore">
                View all <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
