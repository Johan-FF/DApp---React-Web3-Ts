function Footer() {
  return (
    <section className="w-full bg-emerald-800 text-slate-400">
      <div className="border-t-2 border-solid border-t-cyan-400">
        <span>
          <h3>
            © {new Date().getFullYear()} Original designs by
            <a className="ml-1" href="https://github.com/Johan-FF">
              Johan-FF
            </a>
          </h3>
        </span>
      </div>
    </section>
  );
}

export default Footer;
