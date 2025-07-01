"use client";

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import ReactMarkdown from 'react-markdown';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Eye, ArrowLeft, Share } from 'lucide-react';
import slugify from 'slugify';
import { remark } from 'remark';
import remarkParse from 'remark-parse';
import { visit } from 'unist-util-visit';

interface Article {
    title: string;
    excerpt: string;
    content: string;
    tags: string[];
    date: string;
    readTime: string;
    views: number;
}

export default function ArticlePage() {
    const { slug } = useParams();
    const [article, setArticle] = useState<Article | null>(null);
    const [loading, setLoading] = useState(true);
    const [toc, setToc] = useState<{ id: string; title: string; level: number }[]>([]);
    const router = useRouter();

    useEffect(() => {
        if (!slug) return;
        setLoading(true);
        api.get(`/blog/articles/${slug}/`)
            .then(res => {
                const data = res.data as Article;
                setArticle(data);
                setLoading(false);
            })
            .catch(() => {
                setArticle(null);
                setToc([]);
                setLoading(false);
            });
    }, [slug]);

    // Génération du ToC à partir du markdown avec remark
    useEffect(() => {
        if (!article?.content) {
            setToc([]);
            return;
        }
        const tree = remark().use(remarkParse).parse(article.content);
        const headings: { id: string; title: string; level: number }[] = [];
        visit(tree, 'heading', (node: import('mdast').Heading) => {
            const text = Array.isArray(node.children)
                ? node.children
                    .filter((n): n is import('mdast').Text | import('mdast').InlineCode => n.type === 'text' || n.type === 'inlineCode')
                    .map((n) => n.value)
                    .join(' ')
                : '';
            if (text) {
                headings.push({
                    id: getHeadingId(text),
                    title: text,
                    level: node.depth
                });
            }
        });
        setToc(headings);
    }, [article]);

    // Fonction utilitaire pour générer un id à partir du texte du titre
    function getHeadingId(text: string) {
        return slugify(text, { lower: true, strict: true });
    }

    if (loading) {
        return <div className="text-center py-12 text-muted-foreground">Chargement de l&apos;article…</div>;
    }

    if (!article) {
        return (
            <div className="text-center py-12">
                <p className="text-muted-foreground">Article introuvable.</p>
                <button onClick={() => router.back()} className="mt-4 underline text-primary">Retour</button>
            </div>
        );
    }

    return (
        <div className="py-8 max-w-4xl mx-auto">

            {/* Article Header */}
            <article className="space-y-8">
                <header className="space-y-6">
                    <div className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                            {article.tags.map((tag: string) => (
                                <Badge key={tag} variant="secondary">
                                    {tag}
                                </Badge>
                            ))}
                        </div>

                        <h1 className="text-4xl font-bold tracking-tight leading-tight text-primary">
                            {article.title}
                        </h1>

                        <p className="text-xl text-muted-foreground leading-relaxed">
                            {article.excerpt}
                        </p>
                    </div>

                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            {new Date(article.date).toLocaleDateString('fr-FR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            {article.readTime}
                        </div>
                        <div className="flex items-center gap-2">
                            <Eye className="h-4 w-4" />
                            {article.views} vues
                        </div>
                        <Button variant="ghost" size="sm" className="gap-2">
                            <Share className="h-4 w-4" />
                            Partager
                        </Button>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                    {/* Table of Contents - Sidebar */}
                    {toc.length > 0 && (
                        <aside className="lg:col-span-1">
                            <Card className="sticky top-20 hover:shadow-lg transition-shadow cursor-pointer group border-2 border-primary/20">
                                <CardHeader>
                                    <CardTitle className="text-lg">Table des matières</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    {toc.map((item, index) => (
                                        <a
                                            key={index}
                                            href={`#${item.id}`}
                                            onClick={e => {
                                                e.preventDefault();
                                                const el = document.getElementById(item.id);
                                                if (el) {
                                                    const yOffset = -80; // Ajustez selon la hauteur de votre header sticky
                                                    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                                                    window.scrollTo({ top: y, behavior: 'smooth' });
                                                }
                                            }}
                                            className={`block text-sm text-muted-foreground hover:text-primary transition-colors py-1 border-l-2 border-transparent hover:border-primary pl-3 ml-${(item.level - 1) * 2}`}
                                        >
                                            {item.title}
                                        </a>
                                    ))}
                                </CardContent>
                            </Card>
                        </aside>
                    )}

                    {/* Article Content */}
                    <main className={toc.length > 0 ? "lg:col-span-3" : "lg:col-span-4"}>
                        {/* <Card> */}
                        <Card className="hover:shadow-lg transition-shadow cursor-pointer group border-2 border-primary/20">
                            <CardContent className="prose prose-lg p-6 pt-0 pb-0 !max-w-full">
                                <ReactMarkdown
                                    components={{
                                        h1: ({ children, ...props }) => <h1 id={getHeadingId(childrenToString(children))} {...props} >{children}</h1>,
                                        h2: ({ children, ...props }) => <h2 id={getHeadingId(childrenToString(children))} {...props} >{children}</h2>,
                                        h3: ({ children, ...props }) => <h3 id={getHeadingId(childrenToString(children))} {...props} >{children}</h3>,
                                        h4: ({ children, ...props }) => <h4 id={getHeadingId(childrenToString(children))} {...props} >{children}</h4>,
                                        h5: ({ children, ...props }) => <h5 id={getHeadingId(childrenToString(children))} {...props} >{children}</h5>,
                                        h6: ({ children, ...props }) => <h6 id={getHeadingId(childrenToString(children))} {...props} >{children}</h6>,
                                    }}
                                >
                                    {article.content}
                                </ReactMarkdown>
                            </CardContent>
                        </Card>
                        {/* Back button */}
                        <div className="mb-6 mt-4">
                            <Button variant="ghost" className="gap-2" onClick={() => router.push('/blog')}>
                                {/* <ArrowLeft className="h-4 w-4" /> */}
                                {/* Retour au blog */}
                                <div className="flex items-center text-sm text-primary group-hover:gap-2 transition-all">
                                    <ArrowLeft className="h-4 w-4 mr-1 group-hover:translate-x-1 transition-transform" />
                                    <span>
                                        Retour au blog
                                    </span>
                                </div>
                            </Button>
                        </div>
                    </main>
                </div>
            </article >
        </div >
    );

    // Fonction utilitaire pour convertir children React en string
    function childrenToString(children: React.ReactNode): string {
        if (typeof children === 'string') return children;
        if (Array.isArray(children)) return children.map(childrenToString).join('');
        if (typeof children === 'object' && children !== null && 'props' in children) {
            // children is a React element and may have props.children, safe to ignore for string conversion
            return childrenToString((children as { props: { children: React.ReactNode } }).props.children);
        }
        return '';
    }
};
