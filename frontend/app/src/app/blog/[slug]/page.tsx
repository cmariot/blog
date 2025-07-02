import type { Metadata } from 'next'
import ArticlePage from './ArticlePage';

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
        return {
            title: article.title ? `${article.title} | cmariot - Blog` : 'Article | cmariot - Blog',
            description: article.excerpt || 'Article du blog de cmariot.',
            keywords: article.tags || ['blog', 'article', 'cmariot', 'développement'],
        };
    } catch {
        return {
            title: 'Article introuvable | cmariot - Blog',
            description: 'Cet article est introuvable ou a été supprimé.',
        };
    }
}

export default function PageArticle() {
    return <ArticlePage />;
};
