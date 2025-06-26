"use client";

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import ReactMarkdown from 'react-markdown';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
// import { Separator } from '@/components/ui/separator';
import { Calendar, Clock, Eye, ArrowLeft, Share, Link } from 'lucide-react';


export default function ArticlePage() {


    const { slug } = useParams();
    const [article, setArticle] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const tableOfContents = [
        { title: "Définition", id: "definition" },
        { title: "Applications courantes", id: "applications" },
        { title: "Méthodes d'apprentissage", id: "methodes" },
        { title: "Avantages et limites", id: "avantages" },
        { title: "Code d'exemple", id: "code" },
        { title: "Formules mathématiques", id: "formules" },
        { title: "Tableau comparatif", id: "tableau" },
        { title: "Ressources", id: "ressources" },
        { title: "Conclusion", id: "conclusion" }
    ];

    useEffect(() => {
        if (!slug) return;
        setLoading(true);
        api.get(`/blog/articles/${slug}/`)
            .then(res => {
                setArticle(res.data);
                setLoading(false);
            })
            .catch(() => {
                setArticle(null);
                setLoading(false);
            });
    }, [slug]);

    if (loading) {
        return <div className="text-center py-12 text-muted-foreground">Chargement de l'article…</div>;
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
            {/* Back button */}
            <div className="mb-6">
                <Link to="/blog">
                    <Button variant="ghost" className="gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Retour au blog
                    </Button>
                </Link>
            </div>

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

                        <h1 className="text-4xl font-bold tracking-tight leading-tight">
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

                    {/* <Separator /> */}
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Table of Contents - Sidebar */}
                    <aside className="lg:col-span-1">
                        <Card className="sticky top-8">
                            <CardHeader>
                                <CardTitle className="text-lg">Table des matières</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                {tableOfContents.map((item, index) => (
                                    <a
                                        key={index}
                                        href={`#${item.id}`}
                                        className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1 border-l-2 border-transparent hover:border-primary pl-3"
                                    >
                                        {item.title}
                                    </a>
                                ))}
                            </CardContent>
                        </Card>
                    </aside>

                    {/* Article Content */}
                    <main className="lg:col-span-3">
                        <Card>
                                <CardContent className="prose prose-lg p-6 !max-w-full">
                                    <ReactMarkdown>{article.content}</ReactMarkdown>
                                </CardContent>
                        </Card>
                    </main>
                </div>
            </article>
        </div>
    );
};




//     const { slug } = useParams();
//     const [article, setArticle] = useState<any>(null);
//     const [loading, setLoading] = useState(true);
//     const router = useRouter();

//     useEffect(() => {
//         if (!slug) return;
//         setLoading(true);
//         api.get(`/blog/articles/${slug}/`)
//             .then(res => {
//                 setArticle(res.data);
//                 setLoading(false);
//             })
//             .catch(() => {
//                 setArticle(null);
//                 setLoading(false);
//             });
//     }, [slug]);

//     if (loading) {
//         return <div className="text-center py-12 text-muted-foreground">Chargement de l'article…</div>;
//     }

//     if (!article) {
//         return (
//             <div className="text-center py-12">
//                 <p className="text-muted-foreground">Article introuvable.</p>
//                 <button onClick={() => router.back()} className="mt-4 underline text-primary">Retour</button>
//             </div>
//         );
//     }

//     return (
//         <div className="py-8 max-w-3xl mx-auto space-y-8">

//             <Card>

//                 <CardHeader>
//                     <div className="flex items-center justify-between mb-2">
//                         <div className="flex flex-wrap gap-1">
//                             {article.tags.map((tag: string) => (
//                                 <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
//                             ))}
//                         </div>
//                         <div className="flex items-center gap-4 text-sm text-muted-foreground">
//                             <div className="flex items-center gap-1">
//                                 <Eye className="h-3 w-3" />
//                                 {article.views}
//                             </div>
//                         </div>
//                     </div>
//                     <CardTitle className="text-3xl font-bold">{article.title}</CardTitle>
//                     <CardDescription>{article.excerpt}</CardDescription>
//                     <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
//                         <div className="flex items-center gap-1">
//                             <Calendar className="h-3 w-3" />
//                             {new Date(article.date).toLocaleDateString('fr-FR')}
//                         </div>
//                         <div className="flex items-center gap-1">
//                             <Clock className="h-3 w-3" />
//                             {article.readTime}
//                         </div>
//                     </div>
//                 </CardHeader>

//                 <CardContent className="prose prose-lg p-6 !max-w-full">
//                     <ReactMarkdown>{article.content}</ReactMarkdown>
//                 </CardContent>

//             </Card>
//             <Link href='/blog/' className="button mb-4 underline text-primary hover:text-primary/80 transition-colors">
//                 ← Retour au blog
//             </Link>
//         </div>
//     );
// }
