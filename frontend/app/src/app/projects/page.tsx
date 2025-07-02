import type { Metadata } from 'next';
import ProjectsPage from './ProjectsPage';

export const metadata: Metadata = {
    title: "Projets | cmariot - Réalisations et expérimentations",
    description: "Découvrez les projets, outils, bibliothèques et expérimentations techniques réalisés par cmariot dans le domaine du web, de l'IA et de l'automatisation.",
    keywords: ["projets", "cmariot", "réalisations", "web", "IA", "outils", "expérimentations", "automatisation"],
};

export default function Page() {
    return <ProjectsPage />;
}
