import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Calendar, ExternalLink, MapPin } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

interface EducationItem {
  id: string;
  type: 'degree' | 'certification' | 'course';
  title: string;
  institution: string;
  date: string;
  description?: string;
  skills?: string[];
  link?: string;
  location?: string;
}

// Dados mockados - você pode substituir por dados reais
const educationData: EducationItem[] = [
  {
    id: '1',
    type: 'degree',
    title: 'Ciência da Computação',
    institution: 'Universidade de São Paulo',
    date: '2020 - 2024',
    description: 'Bacharelado em Ciência da Computação com foco em desenvolvimento de software e sistemas distribuídos.',
    location: 'São Paulo, SP',
    skills: ['Algoritmos', 'Estrutura de Dados', 'Programação', 'Arquitetura de Software']
  },
  {
    id: '2',
    type: 'certification',
    title: 'AWS Certified Solutions Architect',
    institution: 'Amazon Web Services',
    date: '2023',
    description: 'Certificação em arquitetura de soluções na AWS com foco em sistemas escaláveis e seguros.',
    link: 'https://aws.amazon.com/certification/',
    skills: ['AWS', 'Cloud Architecture', 'Lambda', 'DynamoDB', 'S3']
  },
  {
    id: '3',
    type: 'course',
    title: 'Microservices with Node.js',
    institution: 'Rocketseat',
    date: '2023',
    description: 'Curso avançado sobre arquitetura de microserviços com Node.js e Docker.',
    link: 'https://rocketseat.com.br',
    skills: ['Node.js', 'Microservices', 'Docker', 'API Gateway', 'Message Queues']
  },
  {
    id: '4',
    type: 'certification',
    title: 'Google Cloud Professional Developer',
    institution: 'Google Cloud',
    date: '2023',
    description: 'Certificação profissional em desenvolvimento na Google Cloud Platform.',
    link: 'https://cloud.google.com/certification',
    skills: ['GCP', 'Kubernetes', 'Cloud Functions', 'BigQuery', 'Pub/Sub']
  },
  {
    id: '5',
    type: 'course',
    title: 'Advanced Python for Backend',
    institution: 'Alura',
    date: '2022',
    description: 'Curso avançado de Python para desenvolvimento backend com FastAPI e Django.',
    link: 'https://alura.com.br',
    skills: ['Python', 'FastAPI', 'Django', 'PostgreSQL', 'Redis']
  }
];

export function Education() {
  const { t } = useTranslation();

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'degree':
        return '🎓';
      case 'certification':
        return '📜';
      case 'course':
        return '📚';
      default:
        return '📖';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'degree':
        return t('degree');
      case 'certification':
        return t('certification');
      case 'course':
        return t('course');
      default:
        return type;
    }
  };

  if (educationData.length === 0) {
    return null;
  }

  return (
    <section id="educacao" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl mb-4">{t('educationTitle')}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('educationDescription')}
            </p>
          </div>

          <div className="space-y-6">
            {educationData.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{getTypeIcon(item.type)}</span>
                      <div>
                        <CardTitle className="text-xl">{item.title}</CardTitle>
                        <CardDescription className="text-base mt-1">
                          {item.institution}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge variant="outline" className="shrink-0">
                      {getTypeLabel(item.type)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {item.date}
                      </div>
                      {item.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {item.location}
                        </div>
                      )}
                      {item.link && (
                        <a 
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 hover:text-foreground transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" />
                          {t('viewMore')}
                        </a>
                      )}
                    </div>

                    {item.description && (
                      <p className="text-muted-foreground">{item.description}</p>
                    )}

                    {item.skills && item.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {item.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
