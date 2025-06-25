"use client";

import { useState } from 'react';
import api from '@/lib/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Mail, Github, Linkedin, Twitter, Send, MapPin } from 'lucide-react';


export default function ContactPage() {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(null);
        setError(null);
        try {
            await api.post('/contact/', form);
            setSuccess('Message envoyé !');
            setForm({ name: '', email: '', subject: '', message: '' });
        } catch (err: any) {
            setError(err?.response?.data?.error || "Erreur lors de l'envoi");
        } finally {
            setLoading(false);
        }
    };

    const socialLinks = [
        {
            name: "GitHub",
            url: "https://github.com/cmariot",
            icon: Github,
            description: "Code et projets open source"
        },
        {
            name: "Email",
            url: "mailto:contact@example.com",
            icon: Mail,
            description: "contact@charles-mariot.fr"
        }
    ];

    return (
        <div className="py-8 space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter">Contact</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Toujours ouvert aux discussions techniques, collaborations ou échanges sur nos expériences de développement.
                </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
                {/* Contact Form */}
                <section>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Send className="h-5 w-5 text-primary" />
                                Envoyez-moi un message
                            </CardTitle>
                            <CardDescription>
                                Que ce soit pour un projet, une question technique ou simplement échanger
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-medium">
                                            Nom
                                        </label>
                                        <Input id="name" placeholder="Votre nom" value={form.name} onChange={handleChange} required />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-medium">
                                            Email
                                        </label>
                                        <Input id="email" type="email" placeholder="votre@email.com" value={form.email} onChange={handleChange} required />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="subject" className="text-sm font-medium">
                                        Sujet
                                    </label>
                                    <Input id="subject" placeholder="À propos de..." value={form.subject} onChange={handleChange} required />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-medium">
                                        Message
                                    </label>
                                    <Textarea id="message" placeholder="Votre message..." className="min-h-[120px]" value={form.message} onChange={handleChange} required />
                                </div>
                                {success && <div className="text-green-600 text-sm">{success}</div>}
                                {error && <div className="text-red-600 text-sm">{error}</div>}
                                <Button className="w-full gap-2" type="submit" disabled={loading}>
                                    <Send className="h-4 w-4" />
                                    {loading ? 'Envoi...' : 'Envoyer le message'}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </section>

                {/* Social Links & Info */}
                <section className="space-y-6">
                    {/* Quick Info */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Informations</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-3 text-muted-foreground">
                                <MapPin className="h-4 w-4" />
                                <span>France • Disponible pour des projets</span>
                            </div>
                            <div className="space-y-2">
                                <Badge variant="secondary" className="gap-2">
                                    🚀 Ouvert aux collaborations
                                </Badge>
                                <Badge variant="secondary" className="gap-2">
                                    💡 Discussions techniques
                                </Badge>
                                <Badge variant="secondary" className="gap-2">
                                    🤝 Mentoring mutuel
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Social Links */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Réseaux & Liens</CardTitle>
                            <CardDescription>
                                Retrouvez-moi sur ces plateformes
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {socialLinks.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-4 p-3 rounded-md hover:bg-muted/50 transition-colors group"
                                >
                                    <div className="p-2 rounded-md bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                        <link.icon className="h-4 w-4 text-primary" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-medium group-hover:text-primary transition-colors">
                                            {link.name}
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            {link.description}
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Response Time */}
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-center space-y-2">
                                <div className="text-sm text-muted-foreground">
                                    Temps de réponse habituel
                                </div>
                                <div className="text-2xl font-bold text-primary">
                                    24-48h
                                </div>
                                <div className="text-xs text-muted-foreground">
                                    Sauf week-ends et vacances 🏖️
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </section>
            </div>
        </div>
    );
    // return (
    //     <div className="flex justify-center items-center">
    //         Contact
    //     </div>
    // );
}
