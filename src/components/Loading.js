const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="relative h-32 w-32 mx-auto mb-4">
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
          
            <image
              href="/airplane.svg" // Asegúrate de que esta ruta sea correcta
              height="50"
              width="50"
              x="0"
              y="35"
              className="airplane"
            />
          </svg>
        </div>
        <p className="text-gray-700 text-lg">Cargando...</p>
      </div>
      <style jsx>{`
        .airplane {
          animation: airplane-move 4s linear infinite;
        }
        @keyframes airplane-move {
          0% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(80px);
          }
          100% {
            transform: translateX(0);
          }
        }
        .animate-spin-slow {
          animation: spin 10s linear infinite;
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Loading;
