import { CircularProgress } from "@nextui-org/react";

export const LoadingComp = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
      className="absolute w-screen flex justify-center items-center h-screen"
    >
      <CircularProgress />
    </div>
  );
};
