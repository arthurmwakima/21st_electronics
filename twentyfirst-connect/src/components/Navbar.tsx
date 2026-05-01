import { useState } from "react";
import { Menu, X, Wifi } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import TopHeader from "@/components/TopHeader";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Plans", href: "/plans" },
  { label: "Products", href: "/products" },
  { label: "Coverage", href: "/coverage" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname === href || location.pathname.startsWith(href + "/");
  };

  return (
    <>
      <TopHeader />
      <nav className="fixed top-16 left-0 right-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border" aria-label="Main navigation">
      <div className="container mx-auto flex items-center justify-between h-16 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2" aria-label="21st Electronics home">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center" aria-hidden="true">
            <Wifi className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-heading text-lg font-bold text-foreground">
            21st Electronics
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) =>
            item.href.includes("#") ? (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.label}
                to={item.href}
                className={`text-sm font-medium transition-colors ${
                  isActive(item.href) ? "text-primary" : "text-muted-foreground hover:text-primary"
                }`}
              >
                {item.label}
              </Link>
            )
          )}
          <Button size="sm" asChild>
            <Link to="/contact">Get Connected</Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-card border-b border-border overflow-hidden"
          >
            <div className="flex flex-col gap-1 p-4">
              {navItems.map((item) =>
                item.href.includes("#") ? (
                  <a
                    key={item.label}
                    href={item.href}
                    className="py-3 px-2 text-sm font-medium text-muted-foreground hover:text-primary rounded-lg hover:bg-muted transition-colors min-h-[44px] flex items-center"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.label}
                    to={item.href}
                    className={`py-3 px-2 text-sm font-medium rounded-lg hover:bg-muted transition-colors min-h-[44px] flex items-center ${
                      isActive(item.href) ? "text-primary" : "text-muted-foreground hover:text-primary"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              )}
              <Button size="sm" className="mt-2 min-h-[44px]" asChild>
                <Link to="/contact" onClick={() => setIsOpen(false)}>Get Connected</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
    </>
  );
};

export default Navbar;

