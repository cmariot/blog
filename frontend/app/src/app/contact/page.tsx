import { getMetadata } from '@/lib/seo/getMetadata';
import ContactPage from './ContactPage';

export const metadata = getMetadata({
    title: "Contact | cmariot - Échangeons sur vos projets",
    description: "Contactez cmariot pour discuter de vos projets, collaborations, questions techniques ou opportunités dans le développement web, l'IA et l'open source.",
    keywords: ["contact", "cmariot", "projets", "collaboration", "développement", "open source", "IA"],
});

export default function Page() {
    return <ContactPage />;
}
