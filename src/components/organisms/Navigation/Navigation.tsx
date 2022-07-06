import { NavWrapper, NavItem } from "./Navigation.style";
import { ReactComponent as MenuIcon } from "assets/icons/menuIcon.svg";
import { ReactComponent as NotesIcon } from "assets/icons/notesIcon.svg";
import { ReactComponent as UserIcon } from "assets/icons/userIcon.svg";
import { ReactComponent as StatsIcon } from "assets/icons/statsIcon.svg";
import { HOME, ACCOUNT, TRAININGS } from "constants/routes";

interface IconsType {
  icon: JSX.Element;
  name: string;
  path: string;
  id? : string;
}


const Navigation = () => {
  const icons: IconsType[] = [
    { icon: <MenuIcon />, name: "Menu", path: HOME },
    { icon: <NotesIcon />, name: "treningi", path: TRAININGS, id: 'heart' },
    { icon: <StatsIcon />, name: "Statystyki", path: `${HOME}/stats` },
    { icon: <UserIcon />, name: "Konto", path: ACCOUNT },
  ];
  const renderIcons = icons.map((icon) => (
    <NavItem
      to={icon.path}
      id={icon.id}
      key={icon.name}
      end
    >
      {icon.icon}
      <span>{icon.name}</span>
    </NavItem>
  ));

  return <NavWrapper>{renderIcons}</NavWrapper>;
};

export default Navigation;
