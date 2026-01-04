import thinkpadImg from "../../img/thinkpad.jpeg";
import macbookImg from "../../img/macbook-bg-removed.png";
import { useTheme } from "./ThemeProvider";

interface ContactFormProps {
  showHeading?: boolean;
}

const ContactForm: React.FC<ContactFormProps> = ({ showHeading = true }) => {
  const { theme } = useTheme();
  const isDark = theme === "black";
  const laptopImg = isDark ? macbookImg : thinkpadImg;
  return (
    <div className="mt-10">
      {showHeading && (
        <h2 className="font-bold mb-4 text-gray-400 font-medium tracking-widest px-2">
          CONTACT
        </h2>
      )}
      <div className="flex flex-col lg:flex-row lg:gap-8">
        <div className="flex flex-col gap-3 ml-3">
          <div>
            <p className="font-semibold text-sm opacity-70">Email</p>
            <a href="mailto:viet@nguyenbytes.com" className="text-lg">
              viet@nguyenbytes.com
            </a>
          </div>
          <div>
            <p className="font-semibold text-sm opacity-70">Phone</p>
            <a href="tel:+1234567890" className="text-lg">
              (971) 998-2695
            </a>
          </div>
          <div>
            <p className="font-semibold text-sm opacity-70">LinkedIn</p>
            <a
              href="https://www.linkedin.com/in/vietnguyen-dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg"
            >
              linkedin.com/in/vietnguyen-dev
            </a>
          </div>
        </div>
        <div className="mt-6 lg:-mt-32">
          <img
            src={laptopImg}
            alt={isDark ? "Macbook laptop" : "Thinkpad laptop"}
            className="rounded-lg"
            style={{ width: "500px", height: "500px", objectFit: "cover" }}
          />
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
