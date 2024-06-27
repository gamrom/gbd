import { Spinner } from "@nextui-org/react";

export const LoadingComp = ({ isBlur = false }: { isBlur?: boolean }) => {
  return !isBlur ? (
    <div className="loading-overlay">
      <div className="flex flex-col h-[150px] w-[200px] justify-between items-center">
        <Spinner />
      </div>
    </div>
  ) : (
    <div className="loading-overlay-blur">
      <div className="flex flex-col h-[150px] w-[200px] justify-between items-center">
        <Spinner />
      </div>
    </div>
  );
};
