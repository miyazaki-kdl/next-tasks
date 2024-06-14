import { FaRegCheckSquare, FaRegClock, FaTasks } from "react-icons/fa";
import NavItem from "./NavItem/NavItem";

interface NavItemType {
  id: number;
  label: string;
  link: string;
  icon: React.ReactNode;
}

const NavList = () => {
  const navList: NavItemType[] = [
    {
      id: 1,
      label: "ALL TASKS",
      link: "/",
      icon: <FaTasks className="size-5 " />,
    },
    {
      id: 2,
      label: "COMPLETED TASKS",
      link: "/completed",
      icon: <FaRegCheckSquare className="size-5 " />,
    },
    {
      id: 3,
      label: "EXPIRED TASKS",
      link: "/expired",
      icon: <FaRegClock className="size-5 " />,
    },
  ];

  //NavItemType型のnavlistを定義

  return (
    <div className="mt-24">
      {navList.map((item) => (
        <NavItem
          key={item.id}
          label={item.label}
          link={item.link}
          icon={item.icon}
        />
      ))}
    </div>
  );
};

export default NavList;
