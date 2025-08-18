import { Card, CardContent } from './ui/card';
import { Server, Zap, Shield, Layers } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

export function About() {
  const { t } = useTranslation();

  const highlights = [
    {
      icon: Layers,
      title: t('scalableCode'),
      description: t('scalableCodeDesc')
    },
    {
      icon: Zap,
      title: t('performance'),
      description: t('performanceDesc')
    },
    {
      icon: Shield,
      title: t('security'),
      description: t('securityDesc')
    },
    {
      icon: Server,
      title: t('architecture'),
      description: t('architectureDesc')
    }
  ];

  return (
    <section id="sobre" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl mb-4">{t('aboutMe')}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('aboutDescription')}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-2xl mb-6">{t('myStory')}</h3>
              <div className="space-y-4 text-muted-foreground">
                <p>{t('aboutText1')}</p>
                <p>{t('aboutText2')}</p>
                <p>{t('aboutText3')}</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {highlights.map((highlight, index) => (
                <Card key={index} className="p-6">
                  <CardContent className="text-center p-0">
                    <highlight.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                    <h4 className="mb-2">{highlight.title}</h4>
                    <p className="text-sm text-muted-foreground">{highlight.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
