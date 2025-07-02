import type { Metadata } from 'next'
import ArticlePage from './ArticlePage';
import api from '@/lib/api';
import type { Article } from '@/types/Articles';

type Props = {
    params: Promise<{ slug: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const slug = (await params).slug;
    try {
        const res = await api.get(`/blog/articles/${slug}/`);
        const article: Article = res.data as Article;
        return {
            title: article.title ? `${article.title} | cmariot - Blog` : 'Article | cmariot - Blog',
            description: article.excerpt || 'Article du blog de cmariot.',
            keywords: article.tags || ['blog', 'article', 'cmariot', 'développement'],
        };
    } catch (error) {
        console.error("Erreur lors du fetch article:", error);
        return {
            title: 'Article introuvable | cmariot - Blog',
            description: 'Cet article est introuvable ou a été supprimé.',
        };
    }
}

export default function PageArticle() {
    return <ArticlePage />;
};
