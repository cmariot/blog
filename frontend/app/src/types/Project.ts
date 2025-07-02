export interface Project {
  title: string;
  description: string;
  tags: string[];
  date: string;
  link?: string;
  status?: string;
  category?: string;
  tech?: string[];
  github?: string;
  demo?: string;
  image?: string;
  featured?: boolean;
}
