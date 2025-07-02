import type { Metadata } from 'next';
import HomePage from './HomePage';


export const metadata: Metadata = {
    title: "Accueil | cmariot - Blog, projets et progression",
    description: "Développeur passionné, je partage mes projets, articles et apprentissages sur le développement web, l'IA et l'open source.",
    keywords: ["blog", "développement", "cmariot", "projets", "programmation", "open source", "IA", "apprentissage"],
};

export default function Page() {
    return <HomePage />;
}
