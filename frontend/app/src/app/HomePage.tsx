'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Target, Calendar } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import api from '@/lib/api';

interface Article {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    date: string;
    readTime: string;
    tags: string[];
    views: number;
    featured?: boolean;
}

export default function HomePage() {
    const [recentPosts, setRecentPosts] = useState<Article[]>([]);

    useEffect(() => {
        api.get('/blog/articles/?limit=3')
            .then(res => {
                if (Array.isArray(res.data)) {
                    setRecentPosts(res.data as Article[]);
                } else {
                    setRecentPosts([]);
                }
            })
            .catch(() => setRecentPosts([]));
    }, []);

    return (
        <div className="flex flex-col gap-16 py-8">

            {/* Hero Section */}
            <section className="text-center space-y-6">
                <div className="mx-auto h-40 w-40 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center mb-8">
                    <span className="text-3xl font-mono font-bold text-white">cmariot</span>
                </div>
                <div className="space-y-4">
                    <p className="mx-auto max-w-[700px] text-muted-foreground text-lg md:text-xl">
                        Développeur passionné,
                        je documente publiquement ma progression, mes projets et mes apprentissages.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild size="lg" variant="outline" className="gap-2">
                        <Link href="/about">
                            <Target className="h-4 w-4" />
                            À propos
                        </Link>
                    </Button>
                </div>
            </section>

            {/* Recent Blog Posts */}
            <section className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold tracking-tight">Derniers articles</h2>
                    <Button variant="ghost" asChild>
                        <Link href="/blog" className="gap-2">
                            Voir tous les articles
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </Button>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {Array.isArray(recentPosts) && recentPosts.length > 0 ? (
                        recentPosts.map((post, index) => (
                            <Link key={index} href={`/blog/${post.slug}`} className="group">
                                <Card className="hover:shadow-lg transition-shadow cursor-pointer group h-full flex flex-col">
                                    <CardHeader className="flex-1">
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                            <Calendar className="h-3 w-3" />
                                            {new Date(post.date).toLocaleDateString('fr-FR')}
                                        </div>
                                        <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2 min-h-[3.5rem]">
                                            {post.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3 flex-1 flex flex-col">
                                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 min-h-[4.5rem]">
                                            {post.excerpt}
                                        </p>
                                        <div className="flex flex-wrap gap-1 min-h-[2rem]">
                                            {post.tags.map((tag: string) => (
                                                <Badge key={tag} variant="secondary" className="text-xs">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                        <div className="flex items-center text-sm text-primary group-hover:gap-2 transition-all mt-auto font-bold">
                                            Lire la suite
                                            <ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))
                    ) : (
                        <div className="col-span-full text-center text-muted-foreground">
                            Aucun article récent à afficher.
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="text-center space-y-6 py-12">
                <h2 className="text-2xl font-bold tracking-tight">Suivre ma progression</h2>
                <p className="text-muted-foreground max-w-[600px] mx-auto">
                    Restez au courant de mes avancées, découvertes et réflexions sur le développement.
                    Je partage régulièrement mes apprentissages et mes projets.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild variant="outline" className="gap-2">
                        <Link href="/projects">
                            Mes projets
                        </Link>
                    </Button>
                    <Button asChild className="gap-2">
                        <Link href="/contact" className='font-bold'>
                            Contact
                        </Link>
                    </Button>
                </div>
            </section>

        </div>
    );
}
