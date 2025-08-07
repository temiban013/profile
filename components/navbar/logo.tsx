// components/navbar/logo.tsx
import Image from "next/image";

export const Logo = () => (
  <div className="relative group">
    <Image
      src="/mra-logo-rc.png"
      alt="Mario Rafael Ayala Logo"
      width={120} // Actual image width - adjust based on your logo's true dimensions
      height={48} // Actual image height - creates proper 2.5:1 ratio for rectangular logo
      className="h-12 w-auto rounded-xl professional-shadow transition-all duration-300 group-hover:scale-105 group-hover:professional-shadow-lg"
      priority={true} // Logo should load immediately
    />
    {/* Professional glow effect on hover */}
    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
  </div>
);
