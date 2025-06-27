import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { MapPin, Calendar, Code2, Heart, Target, Lightbulb } from 'lucide-react';


export default function AboutPage() {

    const timeline = [
        {
            year: "2024",
            title: "Transition vers l'excellence technique",
            description: "Décision de me reconvertir complètement vers le développement de haut niveau. Focus sur l'architecture, les patterns avancés et les contributions open source.",
            type: "transition"
        },
        {
            year: "2023",
            title: "Premiers projets en freelance",
            description: "Développement d'applications web pour des clients locaux. Découverte de React, Node.js et des bases de données modernes.",
            type: "work"
        },
        {
            year: "2022",
            title: "Formation intensive développement web",
            description: "6 mois de formation intensive en développement full-stack. HTML, CSS, JavaScript, puis React et Express.",
            type: "education"
        },
        {
            year: "2021",
            title: "Première ligne de code",
            description: "Découverte de la programmation via des tutoriels YouTube. Le déclic : 'Je veux faire ça toute ma vie'.",
            type: "milestone"
        }
    ];

    const currentStack = {
        languages: ["TypeScript", "JavaScript", "Python", "SQL"],
        frontend: ["React", "Next.js", "Tailwind CSS", "Vite"],
        backend: ["Node.js", "Django", "PostgreSQL", "Redis"],
        tools: ["VS Code", "Git", "Docker", "Figma"],
        learning: ["Rust", "GraphQL", "Kubernetes", "AI/ML"]
    };

    const values = [
        {
            icon: Code2,
            title: "Craft & Excellence",
            description: "Chaque ligne de code doit avoir sa raison d'être. Je privilégie la qualité à la quantité."
        },
        {
            icon: Heart,
            title: "Open Source",
            description: "Contribution active à la communauté. Partage des connaissances et collaboration."
        },
        {
            icon: Target,
            title: "Amélioration continue",
            description: "Apprentissage constant, feedback régulier, itération sur mes méthodes de travail."
        },
        {
            icon: Lightbulb,
            title: "Innovation pragmatique",
            description: "Adopter les nouvelles technologies quand elles apportent une vraie valeur."
        }
    ];

    return (
        <div className="py-8 space-y-12">
            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter">À propos</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Développeur autodidacte en quête d'excellence technique.
                    Passionné par l'architecture logicielle et l'apprentissage continu.
                </p>
            </div>

            {/* Bio Section */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold">Mon histoire</h2>
                <Card>
                    <CardContent className="pt-6">
                        <div className="prose prose-neutral dark:prose-invert max-w-none">
                            <p className="text-lg leading-relaxed">
                                Salut ! Je suis un développeur en transformation profonde vers l'excellence technique.
                                Après avoir découvert la programmation il y a quelques années, j'ai rapidement réalisé
                                que ce domaine correspondait parfaitement à ma façon de penser et de résoudre des problèmes.
                            </p>
                            <p className="leading-relaxed">
                                Aujourd'hui, je me concentre sur l'apprentissage des concepts avancés :
                                architecture logicielle, patterns de conception, optimisation des performances,
                                et contribution à l'écosystème open source. Mon objectif est de devenir
                                un développeur capable de concevoir et implémenter des systèmes robustes et évolutifs.
                            </p>
                            <p className="leading-relaxed">
                                Ce site documente publiquement ma progression. Je crois en la transparence
                                et au partage de connaissances comme moyens d'accélérer l'apprentissage
                                et de contribuer à la communauté.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </section>

            {/* Timeline */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold">Parcours</h2>
                <div className="space-y-6">
                    {timeline.map((item, index) => (
                        <div key={index} className="flex gap-6">
                            <div className="flex flex-col items-center">
                                <div className={`w-4 h-4 rounded-full border-2 ${item.type === 'milestone' ? 'bg-primary border-primary' :
                                        item.type === 'transition' ? 'bg-blue-500 border-blue-500' :
                                            item.type === 'education' ? 'bg-purple-500 border-purple-500' :
                                                'bg-muted border-border'
                                    }`} />
                                {index < timeline.length - 1 && (
                                    <div className="w-px h-16 bg-border mt-2" />
                                )}
                            </div>
                            <div className="flex-1 pb-8">
                                <div className="flex items-center gap-2 mb-2">
                                    <Badge variant="outline" className="font-mono">{item.year}</Badge>
                                    <Badge variant={
                                        item.type === 'milestone' ? 'default' :
                                            item.type === 'transition' ? 'secondary' :
                                                'outline'
                                    }>
                                        {item.type === 'milestone' ? 'Milestone' :
                                            item.type === 'transition' ? 'Transition' :
                                                item.type === 'education' ? 'Formation' : 'Travail'}
                                    </Badge>
                                </div>
                                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                                <p className="text-muted-foreground">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Tech Stack */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold">Stack technique</h2>
                <div className="grid gap-6 md:grid-cols-2">
                    {Object.entries(currentStack).map(([category, items]) => (
                        <Card key={category}>
                            <CardHeader>
                                <CardTitle className="capitalize text-lg">
                                    {category === 'learning' ? 'En apprentissage' : category}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {items.map((item) => (
                                        <Badge key={item} variant={category === 'learning' ? 'outline' : 'secondary'}>
                                            {item}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Values */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold">Valeurs & Principes</h2>
                <div className="grid gap-6 md:grid-cols-2">
                    {values.map((value, index) => (
                        <Card key={index} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3">
                                    <value.icon className="h-5 w-5 text-primary" />
                                    {value.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{value.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Contact Info */}
            <section className="text-center space-y-4 py-8">
                <h2 className="text-2xl font-bold">Restons en contact</h2>
                <p className="text-muted-foreground">
                    Toujours ouvert aux discussions techniques, collaborations ou simplement échanger sur nos expériences.
                </p>
                <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        France
                    </div>
                    <Separator orientation="vertical" className="h-4" />
                    <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Disponible pour des projets
                    </div>
                </div>
            </section>
        </div>
    );
};
