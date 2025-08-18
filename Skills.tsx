import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useTranslation } from '../hooks/useTranslation';

export function Skills() {
  const { t } = useTranslation();

  const skillCategories = [
    {
      title: t('languages'),
      skills: [
        'Node.js', 'Python', 'Java', 'Go', 'TypeScript', 'JavaScript', 
        'C#', 'PHP', 'Rust', 'Elixir'
      ]
    },
    {
      title: t('frameworks'),
      skills: [
        'Express.js', 'NestJS', 'FastAPI', 'Django', 'Spring Boot', 'ASP.NET Core', 
        'Gin', 'Echo', 'Koa.js', 'Hapi.js'
      ]
    },
    {
      title: t('databases'),
      skills: [
        'PostgreSQL', 'MongoDB', 'Redis', 'MySQL', 'Elasticsearch', 'DynamoDB',
        'Cassandra', 'InfluxDB', 'SQLite', 'Neo4j'
      ]
    },
    {
      title: t('cloudDevops'),
      skills: [
        'AWS', 'Docker', 'Kubernetes', 'Jenkins', 'GitHub Actions', 'Terraform',
        'Nginx', 'Apache', 'Linux', 'Monitoring'
      ]
    }
  ];

  return (
    <section id="habilidades" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl mb-4">{t('skillsTitle')}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('skillsDescription')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {skillCategories.map((category, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-xl">{category.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <Badge 
                        key={skillIndex} 
                        variant="secondary"
                        className="text-sm py-1 px-3"
                      >
                        {skill}
                      </Badge>
                    ))}
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
