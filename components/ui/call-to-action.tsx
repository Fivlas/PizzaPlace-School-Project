import { MoveRight, PhoneCall } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

function CTA() {
  return (
    <div className="w-full py-20">
      <div className="container mx-auto">
        <div className="flex flex-col text-center bg-[#6D947C] rounded-md p-4 lg:p-14 gap-8 items-center">
          <div>
            <Badge>Get started</Badge>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-[Shrikhand] decoration-wavy underline underline-offset-10">
              Zamów teraz!
            </h3>
            <p className="text-lg leading-relaxed tracking-tight text-[#ffead1] max-w-xl mt-4">
              Zarejestruj się już dzisiaj i zacznij korzystać z naszej platformy już teraz!
            </p>
          </div>
          <div className="flex flex-row gap-4">
            <Button className="gap-4 rounded-full cursor-pointer" variant="outline">
              Zamów teraz <PhoneCall className="w-4 h-4" />
            </Button>
            <Button className="gap-4 rounded-full cursor-pointer">
              Zarejestruj się <MoveRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { CTA };
