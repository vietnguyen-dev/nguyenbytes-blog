import thinkpadImg from "../../img/thinkpad.jpeg";
import macbookImg from "../../img/macbook-bg-removed.png";
import { useTheme } from "./ThemeProvider";
import Cloud from "./Cloud";

interface ContactFormProps {
  showHeading?: boolean;
}

const ContactForm: React.FC<ContactFormProps> = ({ showHeading = true }) => {
  const { theme } = useTheme();
  const isDark = theme === "black";
  const laptopImg = isDark ? macbookImg : thinkpadImg;

  return (
    <div className="mt-10 relative">
      {showHeading && (
        <div className="relative mb-4">
          {/* Decorative cloud for Contact component */}
          <Cloud variant={3} className="absolute -top-6 -left-2 w-48 h-24 text-base-content opacity-5 z-0" />
          <h2 className="font-bold text-gray-400 font-medium tracking-widest px-2 relative z-10">
            CONTACT
          </h2>
        </div>
      )}
      <div className="flex flex-col relative z-10">
        <div className="flex flex-col gap-3 ml-3">
          <div>
            <p className="font-semibold text-sm opacity-70">Email</p>
            <a href="mailto:vietnguyent22@gmail.com" className="text-lg">
              vietnguyent22@gmail.com
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
        <div className="mt-6">
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
