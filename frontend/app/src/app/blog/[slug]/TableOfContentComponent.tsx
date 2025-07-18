'use client';

import { getHeadingId } from './ArticleContent';

export type TocItem = {
    value: string;
    href: string;
    depth: number;
    numbering: number[];
    parent: string;
};

export default function TableOfContentComponent({ toc }: { toc: TocItem[] }) {
    if (!toc || toc.length === 0) return null;

    console.log(toc)
    return (
        <nav className="mb-6">
            <ul className="space-y-1 list-none">
                {toc.map(item => {
                    const headingId = getHeadingId(item.value);
                    return (
                        <li key={headingId} style={{ marginLeft: (item.depth - 2) * 8 }}>
                            <a href={`#${headingId}`} className="hover:text-primary"
                                onClick={e => {
                                    e.preventDefault();
                                    const el = document.getElementById(headingId);
                                    if (el) {
                                        const yOffset = -80;
                                        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                                        window.scrollTo({ top: y, behavior: 'smooth' });
                                    }
                                }}
                            >{item.value}</a>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
