import { Separator } from "@/components/ui/separator";
import {
    Facebook,
    Instagram,
    TwitterIcon,
} from "lucide-react";
import Link from "next/link";

const footerLinks = [
    {
        title: "Strona główna",
        href: "#",
    },
    {
        title: "Menu",
        href: "#",
    },
    {
        title: "Historia",
        href: "#",
    },
    {
        title: "Kontakt",
        href: "#",
    },
    {
        title: "Polityka prywatności",
        href: "#",
    },
];

const Footer = () => {
    return (
        <div className="flex flex-col pt-20">
            <footer>
                <div className="w-full px-8">
                    <div className="pb-12 flex flex-col sm:flex-row items-start justify-between gap-x-8 gap-y-10 px-6 xl:px-0">
                        <div>
                            <Link href="/">
                                <h3 className="text-2xl font-bold leading-tight text-[#e74a27] font-[Shrikhand] decoration-wavy underline underline-offset-4">John's Pizza</h3>
                            </Link>

                            <ul className="mt-6 flex items-center gap-4 flex-wrap">
                                {footerLinks.map(({ title, href }) => (
                                    <li key={title}>
                                        <Link
                                            href={href}
                                            className="text-muted-foreground hover:text-foreground"
                                        >
                                            {title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <Separator className="bg-[#e74a27]" />
                    <div className="py-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-x-2 gap-y-5 px-6 xl:px-0">
                        <span className="text-muted-foreground">
                            &copy; {new Date().getFullYear()}{" "}
                            <Link href="/">
                                John's Pizza
                            </Link>
                            . All rights reserved.
                        </span>

                        <div className="flex items-center gap-5 text-muted-foreground">
                            <Link href="#" target="_blank">
                                <TwitterIcon className="h-5 w-5" />
                            </Link>
                            <Link href="#" target="_blank">
                                <Instagram className="h-5 w-5" />
                            </Link>
                            <Link href="#" target="_blank">
                                <Facebook className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
