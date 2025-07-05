## 🧱 Tech Stack

The project follows a **full-stack API-first architecture** with a clear separation between frontend and backend responsibilities.

| Layer      | Stack                          | Why?                              |
| ---------- | ------------------------------ | --------------------------------- |
| Frontend   | Next.js + TypeScript           | SSR/SSG, interactivity, SEO       |
| Styling    | Tailwind CSS + shadcn/ui       | Speed, consistency, composability |
| Backend    | Django + Django REST Framework | Robust, batteries-included admin  |
| Database   | PostgreSQL                     | Reliable, strong relational model |
| Deployment | OVH VPS + Docker + NGINX       | Full infrastructure control       |

---

## 🌐 Website Features

### Homepage (`/`)

A minimal homepage with a clear message, quick access buttons (About, Blog, Projects, Contact), a list of the latest blog posts, and a short intro about me.

### About (`/about`)

A detailed page with multiple sections:

* My **personal story**
* A **chronological timeline** (highlighting key events per year)
* A grid of **technologies I use**
* My **values and work principles**
* A compact **contact** section

### Blog (`/blog`)

I use Django’s admin panel to write articles, which are served via a public API (`GET /api/blog/articles/`).
This lets me publish new content without pushing to Git every time.

### Projects (`/projects`)

Projects are stored in the Django database and include:

* Name, description, category, status
* Tech stack (e.g. React, Django, etc.)
* Links to GitHub and demo

A REST API (`/api/projects/`) is used to fetch data dynamically on the frontend.

### Contact (`/contact`)

A simple contact form and links to my GitHub and email.
Form submissions are handled by the backend, which formats the content and sends it to me directly.

---

## 🧩 Django Backend

The Django backend exposes a public **read-only REST API**, with write access restricted via admin and authentication.

Example `Project` model:

```python
class Project(models.Model):
    title = models.CharField()
    slug = models.SlugField()
    image = models.CharField()
    description = models.TextField()
    status = models.CharField()
    category = models.CharField()
    tech = models.JSONField()
    github = models.URLField()
    demo = models.URLField()
    featured = models.BooleanField()
```

Each model has its own `Serializer` and `ViewSet`, exposed via Django REST Framework (DRF).

🔐 A token-based authentication system is planned for enabling secure edits from the Next.js interface.

---

## 🎨 Next.js Frontend

The frontend uses **Next.js App Router**, mixing static and server components as needed.

It integrates:

* `Tailwind CSS` for utility-first styling
* `shadcn/ui` for clean, ready-to-use components (modals, cards, buttons, etc.)

Example data fetching (in `/projects/page.tsx`):

```ts
useEffect(() => {
    setLoading(true);
    api.get("/projects/")
        .then(res => {
            setProjects(Array.isArray(res.data) ? res.data : []);
            setLoading(false);
        })
        .catch(() => {
            setProjects([]);
            setLoading(false);
        });
}, []);
```

The components are designed to be **modular and extensible**, making it easy to add new sections (e.g. certifications, books, courses…).

---

## 🚀 Infrastructure & Deployment

The app runs on an **OVH Ubuntu VPS** using `docker-compose`.

Architecture overview:

```yaml
services:
  frontend:
    build: ./frontend
  backend:
    build: ./backend
  nginx:
    build: ./nginx
    ports: ["80:80", "443:443"]
```

### 🔒 Security

* HTTPS via Let’s Encrypt (`certbot`)
* Basic firewall (UFW)
* Django admin protected by authentication

---

## 🛠️ Django Admin as CMS

One of Django’s strengths is its built-in admin interface.
I've customized it to manage both blog posts and projects.

It lets me use the platform as a **personal CMS**, while keeping full control over the source code.

---

## 🔮 Future Improvements

* Better blog post formatting
* Comment support for articles
* Full English version of the site
* JWT-based authentication for in-app editing via the frontend
