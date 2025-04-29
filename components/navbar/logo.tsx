import Image from "next/image";

export const Logo = () => (
  <Image
    src={"/mra-logo-rc.png"}
    alt="Logo MRA"
    width={100}
    height={100}
    className="h-12 w-41"
  />
);
