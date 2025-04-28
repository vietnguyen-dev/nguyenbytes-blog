import headerImg from "../../img/header.jpeg";
import headerImgLight from "../../img/header-light.jpg";
import headerImgWide from "../../img/header-wide.jpg";
import headerImageLightWide from "../../img/header-light-wide.jpg";
import headerLightDesktop from "../../img/header-light-desktop.jpg";

interface iHeaderImgProps {
  theme: string;
}

const HeaderImg: React.FC<iHeaderImgProps> = ({ theme }) => {
  return (
    <div>
      <img
        src={theme === "winter" ? headerImgLight : headerImg}
        className="sm:hidden"
      />
      <img
        src={theme === "winter" ? headerImageLightWide : headerImgWide}
        className="hidden sm:block md:hidden"
      />
      <img
        src={theme === "winter" ? headerLightDesktop : headerImgWide}
        className="hidden md:block md:mx-auto"
      />
    </div>
  );
};

export default HeaderImg;
