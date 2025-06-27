import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-accent/20 to-background p-4">
      <div className="relative">
        {/* Decorative background elements */}
        <div className="absolute -inset-2 bg-gradient-to-r from-tertiary/20 via-accent/30 to-tertiary/20 rounded-3xl blur-xl opacity-70"></div>
        
        {/* Main card */}
        <div className="relative text-center p-12 bg-primary/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-accent/50 max-w-md mx-auto">
          {/* Logo with subtle animation */}
          <div className=" transform hover:scale-105 transition-transform duration-300">
            <Image
              src="/Logo .PNG"
              alt="Christ Community Logo"
              width={220}
              height={220}
              className="mx-auto drop-shadow-lg"
              priority
            />
          </div>
          
          {/* Welcome message with refined typography */}
          <p className="text-xl text-muted-foreground mb-8 font-light tracking-wide">
            Welcome to our church family
          </p>
          
          {/* Decorative element */}
          <div className="flex items-center justify-center mb-6">
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-tertiary to-transparent"></div>
            <div className="w-2 h-2 bg-tertiary rounded-full mx-4 shadow-lg"></div>
            <div className="w-10 h-px bg-gradient-to-r from-tertiary via-transparent to-transparent"></div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
