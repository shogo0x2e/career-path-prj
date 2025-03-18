import { LoadingSpinner } from "@/components/loading-spinner";

type FullLoadingSpinnerProps = {
  message?: string;
};

export const FullLoadingSpinner = ({ message }: FullLoadingSpinnerProps) => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <LoadingSpinner />
      {message && <p className="text-center text-gray-500 pt-4">{message}</p>}
    </div>
  );
};
