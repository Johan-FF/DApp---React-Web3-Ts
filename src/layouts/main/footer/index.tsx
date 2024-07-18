function Footer() {
  return (
    <section className="w-full text-slate-400">
      <div className="border-t-2 border-solid py-4 bg-[#000000aa] border-t-cyan-400 flex justify-center">
        <span>
          <h3>
            <a
              className="ml-1 hover:text-cyan-400"
              href="https://github.com/Johan-FF"
            >
              © {new Date().getFullYear()} Original designs by Johan-FF
            </a>
          </h3>
        </span>
      </div>
    </section>
  );
}

export default Footer;
