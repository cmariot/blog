"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, Code, Zap, Brain, Wrench } from 'lucide-react';
import api from '@/lib/api';

export default function ProjectsPage() {

    const categories = ["Tous", "Web", "Library", "Tools", "AI", "Automation", "DevOps"];
    const [selectedCategory, setSelectedCategory] = useState("Tous");
    const [projects, setProjects] = useState<{
        title: string;
        description: string;
        tags: string[];
        date: string;
        link?: string;
        status?: string;
        category?: string;
        tech?: string[];
        github?: string;
        demo?: string;
        image?: string;
        featured?: boolean;
    }[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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
        ? projects
        : projects.filter(project => project.category === selectedCategory);

    const getStatusText = (status: string) => {
        switch (status) {
            case 'completed':
                return 'Terminé';
            case 'in-progress':
                return 'En cours';
            case 'idea':
                return 'Idée';
            default:
                return status;
        }
    };

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'Web':
                return <Code className="h-4 w-4" />;
            case 'AI':
                return <Brain className="h-4 w-4" />;
            case 'Tools':
                return <Wrench className="h-4 w-4" />;
            default:
                return <Zap className="h-4 w-4" />;
        }
    };

    return (
        <div className="py-8 space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter">Projets</h1>
                <p className="text-xl text-muted-foreground">
                    Une sélection de mes projets, expérimentations et créations techniques
                </p>
            </div>

            {/* Categories Filter */}
            <section className="flex flex-wrap gap-2 justify-center">
                {categories.map((category) => (
                    <Button
                        key={category}
                        variant={selectedCategory === category ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedCategory(category)}
                        className="gap-2"
                    >
                        {category !== "Tous" && getCategoryIcon(category)}
                        {category}
                    </Button>
                ))}
            </section>

            {/* Loader */}
            {loading ? (
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
                                    {projects.filter(p => p.status === 'completed').length}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">En développement</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-blue-500">
                                    {projects.filter(p => p.status === 'in-progress').length}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Technologies</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {[...new Set(projects.flatMap(p => p.tech || []))].length}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Catégories</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {[...new Set(projects.map(p => p.category))].length}
                                </div>
                            </CardContent>
                        </Card>
                    </section>
                </>
            )}
        </div>
    );
};
