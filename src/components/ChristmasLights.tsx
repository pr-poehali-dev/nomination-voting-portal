const ChristmasLights = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-40 pointer-events-none overflow-hidden h-32">
      <div className="relative w-full h-full">
        <div className="absolute top-0 left-0 right-0 flex justify-around items-start">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="relative" style={{ animationDelay: `${i * 0.1}s` }}>
              <div 
                className="w-2 h-2 rounded-full animate-pulse"
                style={{
                  backgroundColor: i % 3 === 0 ? '#FF6B18' : i % 3 === 1 ? '#FFD700' : '#FF8C42',
                  boxShadow: `0 0 10px ${i % 3 === 0 ? '#FF6B18' : i % 3 === 1 ? '#FFD700' : '#FF8C42'}`,
                  animation: `pulse 2s ease-in-out infinite`,
                  animationDelay: `${i * 0.15}s`
                }}
              />
              <div 
                className="absolute top-0 w-px bg-gradient-to-b from-gray-600 to-transparent opacity-30"
                style={{ height: '30px', left: '50%', transform: 'translateX(-50%)' }}
              />
            </div>
          ))}
        </div>
        
        <svg 
          className="absolute top-0 left-0 w-full h-20"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1200 100"
        >
          <path
            d="M0,30 Q60,10 120,30 T240,30 T360,30 T480,30 T600,30 T720,30 T840,30 T960,30 T1080,30 T1200,30"
            fill="none"
            stroke="#333"
            strokeWidth="2"
          />
        </svg>
      </div>
    </div>
  );
};

export default ChristmasLights;
