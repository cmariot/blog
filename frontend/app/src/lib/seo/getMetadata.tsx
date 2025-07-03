// frontend/app/lib/seo/getMetadata.ts

export interface MetadataProps {
    title?: string;
    description?: string;
    url?: string;
    image?: string;
    keywords?: string[];
}

export function getMetadata({
    title = 'Charles Mariot',
    description = 'Développeur IA, passionné par les agents et la tech utile.',
    url = 'https://charles-mariot.fr',
    image = '/og-default.png',
    keywords = [
        'Charles Mariot',
        'Portfolio',
        'Développeur',
        'IA',
        'Web',
        'Automatisation',
        'Projets',
        'Tech',
        'Agents',
    ],
}: MetadataProps = {}) {
    return {
        title,
        description,
        applicationName: 'Charles Mariot Portfolio',
        generator: 'Next.js',
        keywords,
        authors: [
            { name: 'Charles Mariot', url: 'https://charles-mariot.fr' },
        ],
        creator: 'Charles Mariot',
        publisher: 'Charles Mariot',
        formatDetection: {
            email: false,
            address: false,
            telephone: false,
        },
        openGraph: {
            title,
            description,
            url,
            siteName: 'Charles Mariot',
            images: [{ url: image }],
            locale: 'fr_FR',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [image],
        },
    };
}
