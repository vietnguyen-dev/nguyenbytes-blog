import headerImg from "../../img/header.jpeg";
import headerImgLight from "../../img/header-light.jpg";
import headerImgWide from "../../img/header-wide.jpg";
import headerImageLightWide from "../../img/header-light-wide.jpg";
import headerDesktop from "../../img/header-desktop.jpg";
import headerDesktopLight from "../../img/header-light-desktop.jpg";
import { useTheme } from "./ThemeProvider";

const HeaderImg: React.FC = () => {
  const { theme } = useTheme();
  return (
    <>
      <img
        src={theme === "winter" ? headerImgLight : headerImg}
        className="sm:hidden"
      />
      <img
        src={theme === "winter" ? headerImageLightWide : headerImgWide}
        className="hidden sm:block md:hidden"
      />
      <img
        src={theme === "winter" ? headerDesktopLight : headerDesktop}
        className="hidden md:block md:mx-auto"
      />
    </>
  );
};

export default HeaderImg;
