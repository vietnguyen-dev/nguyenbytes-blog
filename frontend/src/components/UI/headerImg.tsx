import headerImg from "../../img/header.jpeg";
import headerImgLight from "../../img/header-light.jpg";
import headerImgWide from "../../img/header-wide.jpg";
import headerImageLightWide from "../../img/header-light-wide.jpg";

interface iHeaderImgProps {
  theme: string;
}

const HeaderImg: React.FC<iHeaderImgProps> = ({ theme }) => {
  return (
    <>
      <img
        src={theme === "winter" ? headerImgLight : headerImg}
        className="sm:hidden"
      />
      <img
        src={theme === "winter" ? headerImageLightWide : headerImgWide}
        className="hidden sm:block sm:mx-auto md:object-cover md:object-top md:h-1/2 lg:border-red-500 xl:border-gray-500"
      />
    </>
  );
};

export default HeaderImg;
