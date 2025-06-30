const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t">
            <div className="flex flex-col items-center justify-center p-2 md:h-24 md:flex-row md:py-0">
                <p className="text-center text-sm text-muted-foreground md:text-left font-mono">
                    {currentYear} - charles-mariot.fr
                </p>
            </div>
        </footer>
    );
};

export default Footer;
