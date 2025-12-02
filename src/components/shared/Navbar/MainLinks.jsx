import { NavLink } from "react-router";

function MainLinks() {
  const links = [
    { id: 1, path: "/", name: "Home" },
    { id: 2, path: "/reviews", name: "All Reviews" },
    { id: 3, path: "/about", name: "About" },
  ];
  return (
    <>
      {links.map(({ id, path, name }) => (
        <li key={id}>
          <NavLink
            to={path}
            className={({ isActive }) =>
              isActive ? "text-primary font-semibold" : ""
            }
          >
            {name}
          </NavLink>
        </li>
      ))}
    </>
  );
}

export default MainLinks;
