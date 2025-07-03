import { getMetadata } from '@/lib/seo/getMetadata';
import BlogPage from './BlogPage';

export const metadata = getMetadata({
    title: "Blog | cmariot - Articles, réflexions et découvertes",
    description: "Retrouvez tous les articles, tutoriels et réflexions de cmariot sur le développement, l'IA, l'open source et l'apprentissage continu.",
    keywords: ["blog", "articles", "développement", "cmariot", "programmation", "open source", "IA", "tutoriels"],
});

export default function Page() {
    return <BlogPage />;
}
