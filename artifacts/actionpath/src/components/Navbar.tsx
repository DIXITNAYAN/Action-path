import { Link, useLocation } from "wouter";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X, Landmark } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";

export function Navbar() {
  const { t, i18n } = useTranslation();
  const [location] = useLocation();
  const { theme, setTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleLang = () => {
    const newLang = i18n.language === "en" ? "hi" : "en";
    i18n.changeLanguage(newLang);
    document.documentElement.lang = newLang;
  };

  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/explore", label: t("nav.explore") },
    { href: "/saved", label: t("nav.saved") },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-primary/10 p-2 rounded-xl group-hover:bg-primary/20 transition-colors">
              <Landmark className="h-5 w-5 text-primary" />
            </div>
            <span className="font-bold text-xl tracking-tight">ActionPath</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location === link.href ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={toggleLang} className="font-medium tracking-wide w-20">
            {i18n.language === "hi" ? "हिं | EN" : "EN | हिं"}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full"
          >
            {mounted && theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Button asChild className="ml-2 rounded-full">
            <Link href="/profile">{t("hero.getStarted")}</Link>
          </Button>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-b bg-background px-4 py-4 space-y-4">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-sm font-medium ${
                  location === link.href ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4 pt-4 border-t">
            <Button variant="outline" size="sm" onClick={toggleLang} className="flex-1">
              {i18n.language === "hi" ? "हिं | EN" : "EN | हिं"}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="shrink-0"
            >
              {mounted && theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
