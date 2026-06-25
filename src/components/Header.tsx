import logo from "../assets/logo.png";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-center gap-2 py-4 bg-zinc-100/50 dark:bg-gray-950/50 backdrop-blur-md">
      <img src={logo} alt="logo" className="w-10 h-10" />
    </header>
  );
}
