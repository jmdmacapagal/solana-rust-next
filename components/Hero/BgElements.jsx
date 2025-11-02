export const renderBgElements = () => {
  return (
    <>
      <div className="absolute inset-0 z-0">
        {/* animated bg */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-purple-600/5 rounded-full blur-3xl"></div>
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-purple-600/5 rounded-full blur-3xl"></div>

          {/* orbital circles */}
          <div className="orbital-ring ring-1"></div>
          <div className="orbital-ring ring-2"></div>
          <div className="orbital-ring ring-3"></div>

          {/* floating elements */}
          <div className="floating-element elem1"></div>
          <div className="floating-element elem2"></div>
          <div className="floating-element elem3"></div>
        </div>
      </div>

      <style jsx>
        {`
          .orbital-ring {
            position: absolute;
            border-radius: 50%;
            border: 1px solid rgba(139, 92, 246, 0.1);
            animation: rotate 60s linear infinite;
          }

          .ring1 {
            width: 400px;
            height: 400px;
            top: -100px;
            right: -100px;
          }

          .ring2 {
            width: 800;
            height: 800px;
            bottom: -200px;
            left: -200px;
            border-color: rgba(16, 185, 129, 0.1);
            animation-duration: 90s;
            animation-direction: reverse;
          }

          .ring-3 {
            width: 400px;
            height: 400px;
            top: 50%;
            left: 60%;
            border: 1px solid rgba(139, 92, 246, 0.1);
            animation-duration: 45s;
          }

          @keyframes rotate {
            from {
              transform: rotate(0deg);
            }

            to {
              transform: rotate(360deg);
            }
          }

          // floating elements
          .floating-element {
            position: absolute;
            background: rgba(139, 92, 246, 0.1);
            border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
            animation: float 10s ease-in-out infinite alternate;
          }

          .elem1 {
            width: 300px;
            height: 300px;
            top: 10%;
            right: 10%;
            animation-delay: 0s;
          }

          .elem2 {
            width: 200px;
            height: 200px;
            bottom: 20%;
            left: 15%;
            background-color: rgba(139, 92, 246, 0.1);
            animation-delay: 2s;
            animation-duration: 12s;
          }

          .elem3 {
            width: 150px;
            height: 150px;
            top: 40%;
            left: 25%;
            background-color: rgba(139, 92, 246, 0.15);
            animation-delay: 4s;
            animation-duration: 8s;
          }

          @keyframes float {
            0% {
              transform: translateY(0px) rotate(0deg);
              border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
            }

            50% {
              transform: translateY(-20px) rotate(10deg);
              border-radius: 70% 30% 30% 70% / 70% 70% 30% 30%;
            }

            100% {
              transform: translateY(0px) rotate(0deg);
              border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
            }
          }
        `}
      </style>
    </>
  );
};
