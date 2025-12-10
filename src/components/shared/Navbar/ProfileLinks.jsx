import { SquareUserRound, NotebookPen, NotebookText, HeartPulse } from 'lucide-react';
import { Link } from "react-router";

function ProfileLinks() {
  const links = [
    { id: 1, Icon: SquareUserRound, path: "/my-profile", name: "My Profile" },
    { id: 2, Icon: NotebookPen, path: "/add-review", name: "Add Review" },
    { id: 3, Icon: NotebookText, path: "/my-reviews", name: "My Reviews" },
    { id: 4, Icon: HeartPulse, path: "/my-favorites", name: "My Favorites" },
  ];
  return (
    <>
      {links.map(({id, Icon, path, name}) => (
        <li key={id}>
          <Link to={path} className='text-[0.8rem] text-warning-content'>
            <Icon size={15} className='text-primary' /> {name}
          </Link>
        </li>
      ))}
    </>
  );
}

export default ProfileLinks;
