const LoadingSpinner = () => {
  return (
    <div className="d-flex justify-content-center mt-5">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="50"
        height="50"
        viewBox="0 0 50 50"
        className="spin"
      >
        <circle
          cx="25"
          cy="25"
          r="20"
          stroke="#007bff"
          strokeWidth="5"
          fill="none"
        />
      </svg>
      <style jsx>{`
        .spin {
          animation: spin 1s linear infinite;
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
      <span className="visually-hidden">Cargando...</span>
    </div>
  );
};

export default LoadingSpinner;
