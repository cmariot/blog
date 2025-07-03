import { getMetadata } from '@/lib/seo/getMetadata';
import AboutPage from './AboutPage';

export const metadata = getMetadata({
    title: "À propos | cmariot - Parcours et valeurs",
    description: "Découvrez le parcours, les valeurs et la philosophie de cmariot, développeur passionné par l'excellence technique et l'open source.",
    keywords: ["à propos", "cmariot", "parcours", "valeurs", "développeur", "open source", "excellence"],
});

export default function Page() {
    return <AboutPage />;
}
