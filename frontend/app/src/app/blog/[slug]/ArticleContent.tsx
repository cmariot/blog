import remarkFlexibleToc from "remark-flexible-toc";
import { evaluate } from "next-mdx-remote-client/rsc";
import type { EvaluateOptions, MDXComponents } from "next-mdx-remote-client/rsc";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TableOfContentComponent from './TableOfContentComponent';
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import slugify from 'slugify';
import remarkGfm from 'remark-gfm'


interface ArticleContentProps {
    article: {
        content: string;
        readTime?: string;
    };
}

function childrenToString(children: React.ReactNode): string {
    if (typeof children === 'string') return children;
    if (Array.isArray(children)) return children.map(childrenToString).join('');
    if (typeof children === 'object' && children !== null && 'props' in children) {
        return childrenToString((children as { props: { children: React.ReactNode } }).props.children);
    }
    return '';
}

export function getHeadingId(text: string) {
    return slugify(text, { lower: true, strict: true });
}

const components: MDXComponents = {
    h1: ({ children, ...props }) => <h1 id={getHeadingId(childrenToString(children))} {...props} >{children}</h1>,
    h2: ({ children, ...props }) => <h2 id={getHeadingId(childrenToString(children))} {...props} >{children}</h2>,
    h3: ({ children, ...props }) => <h3 id={getHeadingId(childrenToString(children))} {...props} >{children}</h3>,
    h4: ({ children, ...props }) => <h4 id={getHeadingId(childrenToString(children))} {...props} >{children}</h4>,
    h5: ({ children, ...props }) => <h5 id={getHeadingId(childrenToString(children))} {...props} >{children}</h5>,
    h6: ({ children, ...props }) => <h6 id={getHeadingId(childrenToString(children))} {...props} >{children}</h6>,
    wrapper: function ({ children }: React.ComponentPropsWithoutRef<"div">) {
        return <div className="mdx-wrapper">{children}</div>;
    },
};

export default async function ArticleContent({ article }: ArticleContentProps) {

    const options: EvaluateOptions<{ readingTime?: string; toc?: [] }> = {
        mdxOptions: {
            remarkPlugins: [
                remarkFlexibleToc,
                remarkGfm
            ],
        },
        parseFrontmatter: true,
        scope: {
            readingTime: article.readTime,
        },
        vfileDataIntoScope: "toc",
    };

    const { content, scope } = await evaluate({
        source: article.content,
        options,
        components,
    });

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">

            {/* Table of Contents - Sidebar */}
            {scope && scope.toc && scope?.toc.length > 0 && (
                <aside className="lg:col-span-1">
                    <Card className="sticky top-20 hover:shadow-lg transition-shadow cursor-pointer group border-2 border-primary/20">
                        <CardHeader>
                            <CardTitle className="text-lg">Table des matières</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 max-h-[70vh] overflow-y-auto">
                            <TableOfContentComponent toc={scope?.toc || []} />
                        </CardContent>
                    </Card>
                </aside>
            )}

            {/* Main */}
            <main className={(scope && scope.toc && scope?.toc.length > 0) ? "lg:col-span-3" : "lg:col-span-4"}>

                {/* Content */}
                <Card className="hover:shadow-lg transition-shadow group border-2 border-primary/20 pt-0 pb-0">
                    <CardContent className="prose prose-lg p-6 pt-0 pb-0 !max-w-full">
                        {content}
                    </CardContent>
                </Card>

                {/* Back button */}
                <div className="mb-6 mt-4">
                    <Link href={'/blog'}>
                        <div className="flex items-center text-sm text-primary group-hover:gap-2 transition-all">
                            <ArrowLeft className="h-4 w-4 mr-1 group-hover:translate-x-1 transition-transform" />
                            <span>
                                Retour au blog
                            </span>
                        </div>
                    </Link>
                </div>

            </main>
        </div>
    );
}

