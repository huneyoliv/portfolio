import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { getVisibleSections } from '../lib/translations';

export function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  const visibleSections = getVisibleSections();

  const socialLinks = [
    {
      icon: Github,
      href: 'https://github.com',
      label: 'GitHub'
    },
    {
      icon: Linkedin,
      href: 'https://linkedin.com',
      label: 'LinkedIn'
    },
    {
      icon: Mail,
      href: 'mailto:seu@email.com',
      label: 'Email'
    }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <button
                onClick={scrollToTop}
                className="text-xl font-medium mb-4 hover:text-primary transition-colors"
              >
                {t('portfolio')}
              </button>
              <p className="text-muted-foreground">
                {t('footerDescription')}
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-4">{t('quickLinks')}</h4>
              <div className="space-y-2">
                <button
                  onClick={() => document.getElementById('sobre')?.scrollIntoView({ behavior: 'smooth' })}
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('about')}
                </button>
                <button
                  onClick={() => document.getElementById('habilidades')?.scrollIntoView({ behavior: 'smooth' })}
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('skills')}
                </button>
                {visibleSections.projects && (
                  <button
                    onClick={() => document.getElementById('projetos')?.scrollIntoView({ behavior: 'smooth' })}
                    className="block text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t('projects')}
                  </button>
                )}
                {visibleSections.education && (
                  <button
                    onClick={() => document.getElementById('educacao')?.scrollIntoView({ behavior: 'smooth' })}
                    className="block text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t('education')}
                  </button>
                )}
                <button
                  onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })}
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('contact')}
                </button>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-4">{t('socialMedia')}</h4>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 bg-background rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-border text-center">
            <p className="text-muted-foreground flex items-center justify-center gap-2">
              © {currentYear} {t('portfolio')}. {t('madeWith')}
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              {t('andCode')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
