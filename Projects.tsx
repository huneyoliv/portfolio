import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ExternalLink, Github, FileText } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useTranslation } from '../hooks/useTranslation';

export function Projects() {
  const { t } = useTranslation();

  const projects = [
    {
      title: 'E-commerce API',
      description: 'API REST completa para e-commerce com autenticação JWT, processamento de pagamentos, gerenciamento de estoque e sistema de notificações.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80',
      technologies: ['Node.js', 'Express', 'PostgreSQL', 'Redis', 'JWT'],
      github: 'https://github.com',
      demo: 'https://api-demo.com',
      documentation: 'https://docs.api.com'
    },
    {
      title: 'Microservices Architecture',
      description: 'Arquitetura de microserviços para sistema de gestão empresarial com comunicação assíncrona, service discovery e circuit breaker.',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
      technologies: ['Node.js', 'Docker', 'Kubernetes', 'RabbitMQ', 'MongoDB'],
      github: 'https://github.com',
      documentation: 'https://docs.microservices.com'
    },
    {
      title: 'Real-time Chat API',
      description: 'API de chat em tempo real com WebSockets, autenticação, salas privadas, histórico de mensagens e integração com notificações push.',
      image: 'https://images.unsplash.com/photo-1611606063065-ee7946f0787a?auto=format&fit=crop&w=800&q=80',
      technologies: ['Node.js', 'Socket.io', 'MongoDB', 'Redis', 'AWS'],
      github: 'https://github.com',
      demo: 'https://chat-demo.com'
    },
    {
      title: 'Analytics Data Pipeline',
      description: 'Pipeline de dados para processamento de analytics com ingestão em tempo real, transformação de dados e APIs para dashboards.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      technologies: ['Python', 'FastAPI', 'Apache Kafka', 'Elasticsearch', 'Docker'],
      github: 'https://github.com',
      documentation: 'https://docs.analytics.com'
    },
    {
      title: 'Authentication Service',
      description: 'Serviço de autenticação centralizado com OAuth2, SSO, 2FA, rate limiting e auditoria de segurança.',
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=80',
      technologies: ['Node.js', 'NestJS', 'PostgreSQL', 'Redis', 'Docker'],
      github: 'https://github.com',
      documentation: 'https://docs.auth.com'
    },
    {
      title: 'File Storage API',
      description: 'API de armazenamento de arquivos com upload, processamento de imagens, CDN integration e controle de acesso granular.',
      image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=800&q=80',
      technologies: ['Go', 'AWS S3', 'Lambda', 'DynamoDB', 'CloudFront'],
      github: 'https://github.com',
      demo: 'https://storage-demo.com'
    }
  ];

  // Se não houver projetos, não renderiza a seção
  if (projects.length === 0) {
    return null;
  }

  return (
    <section id="projetos" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl mb-4">{t('projectsTitle')}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('projectsDescription')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video overflow-hidden">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="gap-2 flex-wrap">
                  <Button variant="outline" size="sm" asChild className="flex-1">
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      {t('code')}
                    </a>
                  </Button>
                  {project.demo && (
                    <Button size="sm" asChild className="flex-1">
                      <a href={project.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        {t('demo')}
                      </a>
                    </Button>
                  )}
                  {project.documentation && (
                    <Button variant="secondary" size="sm" asChild className="flex-1">
                      <a href={project.documentation} target="_blank" rel="noopener noreferrer">
                        <FileText className="h-4 w-4 mr-2" />
                        {t('documentation')}
                      </a>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
