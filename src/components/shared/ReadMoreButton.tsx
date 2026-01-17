type ShowMoreButtonProps = {
  isClamped: boolean;
  textExpanded: boolean;
  setTextExpanded: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ReadMoreButton = ({
  isClamped,
  textExpanded,
  setTextExpanded,
}: ShowMoreButtonProps) => {
  if (!isClamped) return;

  return (
    <button
      onClick={() => setTextExpanded(!textExpanded)}
      className={`cursor-pointer absolute text-(--purple-400) flex flex-row min-w-max`}
    >
      {textExpanded ? <AngleDownIcon /> : <AngleUpIcon />}
      <span className="text-nowrap active:underline active:underline-offset-2">
        {!textExpanded ? "Read more" : "Read less"}
      </span>
    </button>
  );
};

const AngleDownIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="50 30 550 550"
      className="fill-(--purple-400) min-w-6 scale-80"
    >
      <path d="M297.4 201.4C309.9 188.9 330.2 188.9 342.7 201.4L502.7 361.4C515.2 373.9 515.2 394.2 502.7 406.7C490.2 419.2 469.9 419.2 457.4 406.7L320 269.3L182.6 406.6C170.1 419.1 149.8 419.1 137.3 406.6C124.8 394.1 124.8 373.8 137.3 361.3L297.3 201.3z" />
    </svg>
  );
};

const AngleUpIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="50 30 550 550"
      className="fill-(--purple-400) min-w-6 scale-80"
    >
      <path d="M297.4 438.6C309.9 451.1 330.2 451.1 342.7 438.6L502.7 278.6C515.2 266.1 515.2 245.8 502.7 233.3C490.2 220.8 469.9 220.8 457.4 233.3L320 370.7L182.6 233.4C170.1 220.9 149.8 220.9 137.3 233.4C124.8 245.9 124.8 266.2 137.3 278.7L297.3 438.7z" />
    </svg>
  );
};
