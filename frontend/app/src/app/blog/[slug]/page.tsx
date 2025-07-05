import { notFound } from "next/navigation";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Eye } from 'lucide-react';
import ArticleContent from './ArticleContent';
import { getMetadata } from '@/lib/seo/getMetadata';
import type { Metadata } from 'next'
import ShareButton from './ShareButton';


type Props = {
    params: Promise<{ slug: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const slug = (await params).slug;
    try {
        const res = await fetch(`http://backend:8000/blog/articles/${slug}/?no_count=1`, {
            headers: { Accept: 'application/json' }
        });
        if (!res.ok) {
            throw new Error(`Erreur HTTP: ${res.status}`);
        }
        const article = await res.json();
        return getMetadata({
            title: article.title ? `${article.title} | cmariot - Blog` : 'Article | cmariot - Blog',
            description: article.excerpt || 'Article du blog de cmariot.',
            keywords: article.tags || ['blog', 'article', 'cmariot', 'développement'],
        });
    } catch {
        return getMetadata({
            title: 'Article introuvable | cmariot - Blog',
            description: 'Cet article est introuvable ou a été supprimé.',
        });
    }
}


async function getArticle(slug: string) {
    const res = await fetch(`http://backend:8000/blog/articles/${slug}/`, {
        headers: { Accept: 'application/json' }
    });
    if (!res.ok) {
        throw new Error(`Erreur HTTP: ${res.status}`);
    }
    const article = await res.json();
    return article;
}

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>
}) {

    const { slug } = await params

    const article = await getArticle(slug);

    if (!article) return notFound();

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
                        {/* Remplace le bouton Partager par le composant ShareButton */}
                        <ShareButton />
                    </div>
                </header>

                <main>
                    {/* ToC & Article Content */}
                    <ArticleContent article={article} />
                </main>
            </article >
        </div >
    );
}
