interface ImaCardProps {
  image: string;
  name: string;
}

function ImaCard({ image, name, ...props }: ImaCardProps) {
  return (
    <section
      className="p-6 max-w-80 w-full bg-[#000000aa] shadow-2xl rounded-lg relative z-[1]"
      {...props}
    >
      <div
        className={`rounded-lg relative h-60 after:transition-all after:content-none after:w-full after:h-full after:absolute after:top-0 after:left-0 after:bg-[url(${image})] after:blur-lg -z-[1] after:hover:blur-xl`}
      >
        <img className="rounded-lg h-56 w-72 object-cover" src={image} />
      </div>
      <div className="pt-10 flex justify-center">
        <span className="text-xl font-mono font-semibold">{name}</span>
      </div>
    </section>
  );
}

export default ImaCard;
