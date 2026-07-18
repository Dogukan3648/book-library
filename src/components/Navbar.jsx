function Navbar() {
  return (
    <nav className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <h1 className="text-xl font-bold text-slate-900">BookVault</h1>
        <ul className="flex items-center gap-6 text-sm font-medium text-slate-600">
          <li>Home</li>
          <li>My Library</li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
