import { Heart } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t">
            <div className="container flex flex-col items-center justify-between gap-4 p-2 py-10 md:h-24 md:flex-row md:py-0">
                <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
                    <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                        Built with{' '}
                        <Heart className="inline h-3 w-3 text-red-500" />{' '}
                        and curiosity. Version 1.0.0
                    </p>
                </div>
                <p className="text-center text-sm text-muted-foreground md:text-left font-mono">
                    © {currentYear} • dev in progress
                </p>
            </div>
        </footer>
    );
};

export default Footer;
