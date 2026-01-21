import { useState } from "react";

type Props = {
  src: string;
  className?: string;
  h?: number;
  w?: number;
};

export const Image = ({ src, className, h = 10, w = 10 }: Props) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="shrink-0">
      {!loaded && (
        <div
          className={`w-${w} h-${h} rounded-[50%] bg-slate-200 animate-pulse duration-50 from-slate-200 via-slate-300 to-slate-200`}
        />
      )}
      <img
        src={src}
        className={`transition-opacity duration-200 w-${w} h-${h} rounded-[50%] ${className} ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
};
