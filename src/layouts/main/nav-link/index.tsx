import { Link, LinkProps } from "react-router-dom";

interface NavLinkProps extends LinkProps {
  children: React.ReactNode;
}

function NavLink({ children, ...props }: NavLinkProps) {
  return (
    <Link
      className="px-2 py-1 rounded-md hover:no-underline hover:text-cyan-400"
      {...props}
    >
      {children}
    </Link>
  );
}

export default NavLink;
