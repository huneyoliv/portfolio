import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';
import { ThemeLanguageControls } from './ThemeLanguageControls';
import { useTranslation } from '../hooks/useTranslation';
import { getVisibleSections } from '../lib/translations';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const visibleSections = getVisibleSections();
  
  const allNavItems = [
    { id: 'inicio', label: t('home') },
    { id: 'sobre', label: t('about') },
    { id: 'habilidades', label: t('skills') },
    { id: 'projetos', label: t('projects'), condition: visibleSections.projects },
    { id: 'educacao', label: t('education'), condition: visibleSections.education },
    { id: 'contato', label: t('contact') },
  ];

  const navItems = allNavItems.filter(item => item.condition !== false);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/80 backdrop-blur-md border-b border-border' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => scrollToSection('inicio')}
            className="text-xl font-medium"
          >
            {t('portfolio')}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-foreground/80 hover:text-foreground transition-colors"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex">
              <ThemeLanguageControls />
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left text-foreground/80 hover:text-foreground transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-4 border-t border-border">
                <ThemeLanguageControls />
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
