'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, Code, Zap, Brain, Wrench } from 'lucide-react';
import api from '@/lib/api';
import { Project } from '@/types/Project';
import Link from 'next/link';

export default function ProjectsPage() {

    const [loading, setLoading] = useState(true);
    const [projects, setProjects] = useState<Project[]>([]);
    const allCategories = [
        ...new Set(projects.map((p) => p.category)),
    ];
    const categories = [
        "Tous",
        ...allCategories.filter((cat) => !!cat && projects.some((p) => p.category === cat))
    ];
    const [selectedCategory, setSelectedCategory] = useState("Tous");

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'Web':
                return <Code className="h-4 w-4" />;
            case 'IA':
                return <Brain className="h-4 w-4" />;
            case 'Outils':
                return <Wrench className="h-4 w-4" />;
            default:
                return <Zap className="h-4 w-4" />;
        }
    };

    useEffect(() => {
        // Fetch des projets lors du mount du component
        setLoading(true);
        api.get("/projects/")
            .then(res => {
                setProjects(Array.isArray(res.data) ? res.data : []);
                setLoading(false);
            })
            .catch(() => {
                setProjects([]);
                setLoading(false);
            });
    }, []);

    const filteredProjects = selectedCategory === "Tous"
        ? projects.filter(project => !project.featured)
        : projects.filter(project => project.category === selectedCategory);

    const getStatusText = (status: string) => {
        switch (status) {
            case 'completed':
                return 'Terminé';
            case 'in_progress':
                return 'En cours';
            case 'idea':
                return 'Idée';
            default:
                return status;
        }
    };

    return (
        <div className="py-8 space-y-8">

            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter">Projets</h1>
                <p className="text-xl text-muted-foreground">
                    Voici une sélection de mes projets personnels et professionnels, entre IA, Web et bas niveau.<br />Chaque projet est l&apos;occasion d&apos;explorer une techno, un pattern, ou une idée que je veux tester.
                </p>
            </div >

            {/* Categories Filter */}
            < section className="flex flex-wrap gap-2 justify-center" >
                {
                    categories.map((category) => (
                        <Button
                            key={category}
                            variant={selectedCategory === category ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setSelectedCategory(category ?? "Tous")}
                            className="gap-2"
                        >
                            {category !== "Tous" && getCategoryIcon(category ?? '')}
                            {category}
                        </Button>
                    ))
                }
            </section >

            {/* Loader */}
            {
                loading ? (
                    <div className="text-center py-12 text-muted-foreground">Chargement des projets…</div>
                ) : (
                    <>

                        {/* Featured Projects */}
                        {selectedCategory === "Tous" && (
                            <section className="space-y-6">
                                <h2 className="text-2xl font-bold">Projets phares</h2>
                                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    {projects.filter(p => p.featured).map((project, index) => (
                                        <Card key={index} className="hover:shadow-lg transition-shadow group border-2 border-primary/20">
                                            <CardHeader>
                                                <div className="flex items-center justify-between mb-3">
                                                    <div className="text-3xl">{project.image}</div>
                                                    <Badge className="bg-primary text-primary-foreground">
                                                        ⭐ Featured
                                                    </Badge>
                                                </div>
                                                <CardTitle className="group-hover:text-primary transition-colors">
                                                    {project.title}
                                                </CardTitle>
                                                <CardDescription>{project.description}</CardDescription>
                                            </CardHeader>
                                            <CardContent className="space-y-4">
                                                <div className="flex items-center gap-2">
                                                    <Badge>
                                                        {getStatusText(project.status || '')}
                                                    </Badge>
                                                    <Badge variant="outline" className="gap-1">
                                                        {getCategoryIcon(project.category || '')}
                                                        {project.category}
                                                    </Badge>
                                                </div>
                                                <div className="flex flex-wrap gap-1">
                                                    {project.tech && project.tech.map((tech: string) => (
                                                        <Badge key={tech} variant="secondary" className="text-xs">
                                                            {tech}
                                                        </Badge>
                                                    ))}
                                                </div>
                                                <div className="flex gap-2">
                                                    {project.github && (
                                                        <Button size="sm" variant="outline" asChild className="gap-2">
                                                            <a href={project.github} target="_blank" rel="noopener noreferrer">
                                                                <Github className="h-3 w-3" />
                                                                Code
                                                            </a>
                                                        </Button>
                                                    )}
                                                    {project.demo && (
                                                        <Button size="sm" asChild className="gap-2">
                                                            <a href={project.demo} target="_blank" rel="noopener noreferrer">
                                                                <ExternalLink className="h-3 w-3" />
                                                                Demo
                                                            </a>
                                                        </Button>
                                                    )}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* All Projects */}
                        <section className="space-y-6">
                            <h2 className="text-2xl font-bold">
                                {selectedCategory === "Tous" ? "Tous les projets" : `Projets ${selectedCategory}`}
                            </h2>
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {filteredProjects.map((project, index) => (
                                    <Card key={index} className={`hover:shadow-lg transition-shadow group ${project.featured && selectedCategory === "Tous" ? 'opacity-50' : ''}`}>
                                        <CardHeader>
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="text-3xl">{project.image}</div>
                                                <div className="flex gap-2">
                                                    <Badge>
                                                        {getStatusText(project.status || '')}
                                                    </Badge>
                                                </div>
                                            </div>
                                            <CardTitle className="group-hover:text-primary transition-colors">
                                                {project.title}
                                            </CardTitle>
                                            <CardDescription>{project.description}</CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <Badge variant="outline" className="gap-1">
                                                {getCategoryIcon(project.category || '')}
                                                {project.category}
                                            </Badge>

                                            <div className="flex flex-wrap gap-1">
                                                {project.tech && project.tech.map((tech: string) => (
                                                    <Badge key={tech} variant="secondary" className="text-xs">
                                                        {tech}
                                                    </Badge>
                                                ))}
                                            </div>

                                            <div className="flex gap-2">
                                                {project.github && (
                                                    <Button size="sm" variant="outline" asChild className="gap-2">
                                                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                                                            <Github className="h-3 w-3" />
                                                            Code
                                                        </a>
                                                    </Button>
                                                )}
                                                {project.demo && (
                                                    <Button size="sm" asChild className="gap-2">
                                                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                                                            <ExternalLink className="h-3 w-3" />
                                                            Demo
                                                        </a>
                                                    </Button>
                                                )}
                                                {project.status === 'idea' && (
                                                    <Badge variant="outline" className="text-xs">
                                                        💡 Concept
                                                    </Badge>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </section>

                        {/* Stats */}
                        <section className="grid gap-4 md:grid-cols-4 pt-8">
                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium">Projets terminés</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-green-500">
                                        {filteredProjects.filter(p => p.status === 'completed').length}
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium">En développement</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-blue-500">
                                        {filteredProjects.filter(p => p.status === 'in_progress').length}
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium">Technologies</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">
                                        {[...new Set(filteredProjects.flatMap(p => p.tech || []))].length}
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium">Catégories</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">
                                        {[...new Set(filteredProjects.map(p => p.category))].length}
                                    </div>
                                </CardContent>
                            </Card>
                        </section>

                        {/* CTA */}
                        <div className="text-center space-y-4">
                            <p className="text-xl text-muted-foreground">
                                N&apos;hésitez pas à explorer le code, ou à me contacter pour discuter d&apos;un projet
                            </p>
                            <Button asChild className="gap-2">
                                <Link href="/contact">
                                    Contact
                                </Link>
                            </Button>
                        </div>

                    </> // !loading end;
                )
            }

        </div >
    );

}
