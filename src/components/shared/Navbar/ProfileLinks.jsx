import { FaHeart, FaPlus, FaUser } from "react-icons/fa6";
import { IoDocumentText } from "react-icons/io5";
import { Link } from "react-router";

function ProfileLinks() {
  const links = [
    { id: 1, Icon: FaUser, path: "/my-profile", name: "My Profile" },
    { id: 2, Icon: FaPlus, path: "/add-review", name: "Add Review" },
    { id: 3, Icon: IoDocumentText, path: "/my-reviews", name: "My Reviews" },
    { id: 4, Icon: FaHeart, path: "/my-favorites", name: "My Favorites" },
  ];
  return (
    <>
      {links.map(({id, Icon, path, name}) => (
        <li key={id}>
          <Link to={path}>
            <Icon /> {name}
          </Link>
        </li>
      ))}
    </>
  );
}

export default ProfileLinks;
