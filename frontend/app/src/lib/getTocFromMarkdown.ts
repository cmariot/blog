// Extrait la table des matières à partir d'un contenu Markdown
export interface TocItem {
  title: string;
  id: string;
  level: number;
}

// Génère un slug à partir d'un titre
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\u00C0-\u017F\s-]/g, '') // lettres, chiffres, accents, espaces
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export default function getTocFromMarkdown(markdown: string): TocItem[] {
  const lines = markdown.split('\n');
  const toc: TocItem[] = [];
  for (const line of lines) {
    const match = line.match(/^(#{1,6})\s+(.*)/);
    if (match) {
      const level = match[1].length;
      const title = match[2].trim();
      const id = slugify(title);
      toc.push({ title, id, level });
    }
  }
  return toc;
}
