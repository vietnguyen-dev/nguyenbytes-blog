interface CloudProps {
  className?: string;
}

const Cloud: React.FC<CloudProps> = ({ className = "" }) => {
  return (
    <svg
      className={`transition-transform duration-500 hover:scale-110 hover:-translate-y-2 ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 50"
      fill="currentColor"
    >
      <path d="M15,30 Q15,20 25,20 Q25,10 35,10 Q45,10 45,20 Q55,18 60,25 Q70,25 70,35 Q70,45 60,45 L25,45 Q15,45 15,35 Q15,30 15,30 Z" />
    </svg>
  );
};

export default Cloud;
