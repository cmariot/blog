'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { MapPin, Calendar, Code2, Heart, Target, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

export default function AboutPage() {
    const timeline = [
        {
            year: "2025",
            title: "Transition vers l'excellence technique",
            description: "Recentrage sur l'architecture logicielle, les design patterns, l'optimisation des performances et les bonnes pratiques du développement moderne. Lancement d'un site personnel pour documenter mes apprentissages, partager mes projets et affirmer mon identité technique.",
            type: "transition"
        },
        {
            year: "2024",
            title: "Spécialisation IA & MLOps",
            description: "Approfondissement des fondations de l'intelligence artificielle : régression linéaire et logistique, réseaux de neurones, classification d'images, apprentissage par renforcement et imitation learning. Premiers pipelines d'entraînement et d'évaluation sur données réelles.",
            type: "milestone"
        },
        {
            year: "2023",
            title: "Développement web & mise en production",
            description: "Déploiement des premières applications web fullstack avec React, Node.js et PostgreSQL. Introduction aux API REST, à la conteneurisation et aux workflows CI/CD.",
            type: "work"
        },
        {
            year: "2022",
            title: "Programmation système & algorithmique bas niveau",
            description: "Maîtrise des fondamentaux du C et C++ : implémentation d'une bibliothèque standard, moteur de ray tracing, shell Unix, serveur HTTP.",
            type: "education"
        },
        {
            year: "2021",
            title: "Entrée à 42 Paris",
            description: "Plongée intensive dans la programmation système, la résolution de problèmes complexes et les projets en pair programming.",
            type: "milestone"
        }
    ];

    const currentStack = {
        'OS & bas niveau': ["Linux", "C", "shell scripting"],
        'Frontend': ["React", "Next.js", "Tailwind CSS", "HTML", "CSS"],
        'Backend': ["Django", "FastAPI", "PostgreSQL", "Redis"],
        'DevOps': ["Docker", "GitHub Actions", "Nginx", "Ansible"],
        'IA': ["PyTorch", "Numpy", "Pandas", "Matplotlib"],
        'Agents': ["Ollama", "RAG", "Tools"],
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
                    Développeur autodidacte en quête d&apos;excellence technique.
                    Passionné par l&apos;architecture logicielle et l&apos;apprentissage continu.
                </p>
            </div>

            {/* Bio Section */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold">Mon histoire</h2>
                <Card className='p-0'>
                    <CardContent className="p-0">
                        <div className="prose prose-neutral dark:prose-invert max-w-none">
                            <p className="text-lg leading-relaxed">
                                Salut ! Je suis un développeur qui vise a se specialiser dans l&apos;IA et la donnee.
                                Après avoir découvert la programmation il y a quelques années, j&apos;ai rapidement réalisé
                                que ce domaine correspondait parfaitement à ma façon de penser et de résoudre des problèmes.
                            </p>
                            <p className="leading-relaxed">
                                Aujourd&apos;hui, je me concentre sur l&apos;apprentissage des concepts avancés :
                                architecture logicielle, patterns de conception, optimisation des performances,
                                et contribution à l&apos;écosystème open source. Mon objectif est de devenir
                                un développeur capable de concevoir et implémenter des systèmes robustes et évolutifs.
                            </p>
                            <p className="leading-relaxed">
                                Ce site documente publiquement ma progression. Je crois en la transparence
                                et au partage de connaissances comme moyens d&apos;accélérer l&apos;apprentissage
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

            {/* Contact */}
            <section className="text-center space-y-4 py-8">
                <h2 className="text-2xl font-bold">Contact</h2>
                <p className="text-muted-foreground">
                    Ouvert aux collaborations techniques, projets IA, dev backend ou outils internes.
                    Disponible pour échange, mission ou opportunité long terme.
                </p>
                <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        Paris
                    </div>
                    <Separator orientation="vertical" className="h-4" />
                    <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Disponible
                    </div>
                </div>
                <Button asChild className="gap-2">
                    <Link href="/contact">
                        Contact
                    </Link>
                </Button>
            </section>
        </div>
    );
}
