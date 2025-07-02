import type { Metadata } from 'next';
import ArticlePage from './ArticlePage';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    // Récupération des infos de l'article côté serveur pour le SEO
    try {
        const res = await api.get(`/blog/articles/${params.slug}/`);
        const article = res.data as {
            title?: string;
            excerpt?: string;
            tags?: string[];
        };
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

export default function Article() {
    return <ArticlePage />;
};
