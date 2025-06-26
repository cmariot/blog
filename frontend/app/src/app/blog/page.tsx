"use client";

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar, Clock, Search, ArrowRight, Eye } from 'lucide-react';
import Link from 'next/link';


// {
//   title: "Deep dive dans React Server Components",
//   slug: "react-server-components-deep-dive",
//   excerpt: "Une exploration complète des React Server Components : concepts, implémentation, et impact sur l'architecture des applications modernes.",
//   content: "Les React Server Components représentent un changement fondamental dans la façon dont nous concevons les applications React...",
//   date: "2024-06-20",
//   readTime: "12 min",
//   tags: ["React", "SSR", "Architecture"],
//   views: 234,
//   featured: true
// },

export default function BlogPage() {

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTag, setSelectedTag] = useState('');
    const [blogPosts, setBlogPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        api.get('/blog/articles/')
            .then(res => {
                setBlogPosts(Array.isArray(res.data) ? res.data : []);
                setLoading(false);
            })
            .catch(() => {
                setBlogPosts([]);
                setLoading(false);
            });
    }, []);

    const allTags = [...new Set(blogPosts.flatMap(post => post.tags))];

    const filteredPosts = blogPosts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesTag = !selectedTag || post.tags.includes(selectedTag);
        return matchesSearch && matchesTag;
    });

    const featuredPosts = filteredPosts.filter(post => post.featured);
    const regularPosts = filteredPosts.filter(post => !post.featured);

    if (loading) {
        return (
            <div className="text-center py-12 text-muted-foreground">Chargement des articles…</div>
        );
    }

    return (
        <div className="py-8 space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter">Blog</h1>
                <p className="text-xl text-muted-foreground">
                    Mes réflexions, découvertes et apprentissages en développement
                </p>
            </div>

            {/* Search and Filters */}
            <section className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Rechercher un article..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </div>

                <div className="flex flex-wrap gap-2">
                    <Button
                        variant={selectedTag === '' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedTag('')}
                    >
                        Tous les articles
                    </Button>
                    {allTags.map((tag) => (
                        <Button
                            key={tag}
                            variant={selectedTag === tag ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setSelectedTag(tag)}
                        >
                            {tag}
                        </Button>
                    ))}
                </div>
            </section>

            {/* Featured Posts */}
            {featuredPosts.length > 0 && (
                <section className="space-y-6">
                    <h2 className="text-2xl font-bold">Articles mis en avant</h2>
                    <div className="grid gap-6 md:grid-cols-2">
                        {featuredPosts.map((post, index) => (
                            <Link href={`/blog/${post.slug}`} key={index} className="block">
                                <Card className="hover:shadow-lg transition-shadow cursor-pointer group border-2 border-primary/20">
                                    <CardHeader>
                                        <div className="flex items-center justify-between mb-2">
                                            <Badge className="bg-primary text-primary-foreground">
                                                ⭐ Featured
                                            </Badge>
                                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                <div className="flex items-center gap-1">
                                                    <Eye className="h-3 w-3" />
                                                    {post.views}
                                                </div>
                                            </div>
                                        </div>
                                        <CardTitle className="text-xl group-hover:text-primary transition-colors">
                                            {post.title}
                                        </CardTitle>
                                        <CardDescription>{post.excerpt}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="h-3 w-3" />
                                                {new Date(post.date).toLocaleDateString('fr-FR')}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                {post.readTime}
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap gap-1">
                                            {post.tags.map((tag: string) => (
                                                <Badge key={tag} variant="secondary" className="text-xs">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                        <div className="flex items-center text-sm text-primary group-hover:gap-2 transition-all">
                                            Lire l'article
                                            <ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {/* Regular Posts */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold">Tous les articles</h2>
                <div className="grid gap-6">
                    {regularPosts.map((post, index) => (
                        <Link href={`/blog/${post.slug}`} key={index} className="block">
                            <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                                <CardHeader>
                                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                        <div className="flex-1 space-y-2">
                                            <CardTitle className="text-xl group-hover:text-primary transition-colors">
                                                {post.title}
                                            </CardTitle>
                                            <CardDescription>{post.excerpt}</CardDescription>
                                        </div>
                                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                            <div className="flex items-center gap-1">
                                                <Eye className="h-3 w-3" />
                                                {post.views}
                                            </div>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="h-3 w-3" />
                                            {new Date(post.date).toLocaleDateString('fr-FR')}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="h-3 w-3" />
                                            {post.readTime}
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-1">
                                        {post.tags.map((tag: string) => (
                                            <Badge key={tag} variant="secondary" className="text-xs">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                    <div className="flex items-center text-sm text-primary group-hover:gap-2 transition-all">
                                        Lire l'article
                                        <ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </section>

            {/* No results */}
            {filteredPosts.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-muted-foreground">
                        Aucun article trouvé pour "{searchTerm}" {selectedTag && `avec le tag "${selectedTag}"`}
                    </p>
                    <Button variant="ghost" onClick={() => { setSearchTerm(''); setSelectedTag(''); }} className="mt-4">
                        Réinitialiser les filtres
                    </Button>
                </div>
            )}
        </div>
    );
};
