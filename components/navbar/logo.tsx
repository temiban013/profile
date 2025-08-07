import Image from "next/image";

export const Logo = () => (
  <div className="relative group">
    <Image
      src={"/mra-logo-rc.png"}
      alt="Logo MRA"
      width={100}
      height={100}
      className="h-12 w-auto rounded-xl professional-shadow transition-all duration-300 group-hover:scale-105 group-hover:professional-shadow-lg"
    />
    {/* Professional glow effect on hover */}
    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
  </div>
);
