"use client"; //usePathnameはhookなのでuse clientをつけてクライアントコンポーネントに変更する

//このコンポーネントはNavListからNavigation要素を受け取る
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItemProps {
  label: string;
  link: string;
  icon: React.ReactNode;
}

const NavItem: React.FC<NavItemProps> = ({ label, link, icon }) => {
  //usePathname()で取得した現在ページのpathNameとlinkが等しい場合にアクティブであると判断する
  const pathName = usePathname();
  return (
    <Link
      href={link}
      className={`flex p-4 items-center w-full hover:bg-gray-700 font-medium ${
        pathName === link ? "bg-gray-600 border-r-4 border-r-green-500" : ""
      }`}
    >
      <div className="mr-1">{icon}</div>
      <div>{label}</div>
    </Link>
  );
};

export default NavItem;
