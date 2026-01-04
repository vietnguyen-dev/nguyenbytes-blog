interface CloudProps {
  className?: string;
  variant?: 1 | 2 | 3 | 4;
}

const Cloud: React.FC<CloudProps> = ({ className = "", variant = 1 }) => {
  const cloudPaths = {
    1: "M15,30 Q15,20 25,20 Q25,10 35,10 Q45,10 45,20 Q55,18 60,25 Q70,25 70,35 Q70,45 60,45 L25,45 Q15,45 15,35 Q15,30 15,30 Z",
    2: "M10,35 Q10,25 20,22 Q20,15 30,15 Q38,15 42,20 Q50,18 58,22 Q68,22 73,28 Q80,28 80,35 Q80,42 73,42 L20,42 Q10,42 10,35 Z",
    3: "M20,38 Q20,30 28,28 Q28,20 38,18 Q48,18 50,25 Q58,23 65,28 Q72,28 72,35 Q72,43 65,43 L28,43 Q20,43 20,38 Z",
    4: "M12,33 Q12,23 22,20 Q25,12 35,12 Q42,12 45,18 Q52,16 60,20 Q70,20 75,28 Q82,28 82,35 Q82,44 75,44 L22,44 Q12,44 12,33 Z",
  };

  return (
    <svg
      className={`transition-transform duration-500 hover:scale-110 hover:-translate-y-2 ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 50"
      fill="currentColor"
    >
      <path d={cloudPaths[variant]} />
    </svg>
  );
};

export default Cloud;
