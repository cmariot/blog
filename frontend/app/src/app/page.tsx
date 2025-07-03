import { getMetadata } from '@/lib/seo/getMetadata';
import HomePage from './HomePage';


export const metadata = getMetadata({
    title: "Accueil | cmariot - Blog, projets et progression",
    description: "Développeur passionné, je partage mes projets, articles et apprentissages sur le développement web, l'IA et l'open source.",
    keywords: ["blog", "développement", "cmariot", "projets", "programmation", "open source", "IA", "apprentissage"],
});

export default function Page() {
    return <HomePage />;
}
