interface CloudProps {
  className?: string;
  variant?: 1 | 2 | 3 | 4;
}

const Cloud: React.FC<CloudProps> = ({ className = "", variant = 1 }) => {
  const cloudPaths = {
    1: "M15,32 Q15,22 25,20 Q28,12 38,12 Q48,12 50,20 Q58,18 65,22 Q75,22 75,32 Q75,42 65,42 Q60,46 50,46 Q40,46 30,44 Q20,44 15,38 Q15,32 15,32 Z",
    2: "M10,32 Q10,24 20,20 Q24,13 34,13 Q44,13 48,20 Q56,18 64,22 Q74,22 76,30 Q78,38 70,40 Q65,44 55,44 Q45,44 35,42 Q25,42 18,40 Q10,38 10,32 Z",
    3: "M18,34 Q18,26 26,22 Q30,15 40,15 Q50,15 54,22 Q62,20 70,24 Q78,24 78,32 Q78,40 70,42 Q65,45 55,45 Q45,45 35,43 Q25,43 18,38 Q18,34 18,34 Z",
    4: "M12,30 Q12,22 22,18 Q26,11 36,11 Q46,11 50,18 Q58,16 66,20 Q76,20 78,28 Q80,36 72,39 Q67,43 57,43 Q47,43 37,41 Q27,41 20,39 Q12,37 12,30 Z",
  };

  return (
    <svg
      className={`transition-transform duration-500 hover:scale-125 hover:-translate-y-2 ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 50"
      fill="currentColor"
    >
      <path d={cloudPaths[variant]} />
    </svg>
  );
};

export default Cloud;
