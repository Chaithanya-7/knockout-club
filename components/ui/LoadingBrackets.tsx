"use client";

export default function LoadingBrackets() {
  return (
    <div className="relative flex min-h-screen items-center justify-center">
      <svg className="h-15 w-30" viewBox="0 0 120 60" aria-hidden="true">
        <path
          className="fill-none stroke-pbgreen stroke-5 stroke-round animate-[draw_1.5s_ease-in-out_infinite]"
          style={{
            strokeDasharray: 100,
            strokeDashoffset: 100,
            strokeLinecap: "round",
          }}
          d="M40 15 L20 30 L40 45"
        />

        <path
          className="fill-none stroke-pbgreen stroke-5 stroke-round animate-[draw_1.5s_ease-in-out_infinite]"
          style={{
            strokeDasharray: 100,
            strokeDashoffset: 100,
            strokeLinecap: "round",
            animationDelay: "0.5s",
          }}
          d="M80 15 L100 30 L80 45"
        />

        <path
          className="fill-none stroke-pbgreen stroke-5 stroke-round animate-[draw_1.5s_ease-in-out_infinite]"
          style={{
            strokeDasharray: 100,
            strokeDashoffset: 100,
            strokeLinecap: "round",
            animationDelay: "1s",
          }}
          d="M68 12 L52 48"
        />
      </svg>

      <style jsx>{`
        @keyframes draw {
          0% {
            stroke-dashoffset: 100;
          }
          20%,
          90% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: 100;
          }
        }

        @keyframes pop {
          0% {
            opacity: 0;
            transform: scale(0);
          }
          5% {
            opacity: 1;
            transform: scale(1.2);
          }
          10%,
          90% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(0);
          }
        }
      `}</style>
    </div>
  );
}
