"use client";
import { IconLoader2 } from "@tabler/icons-react";

const Loading = (): React.JSX.Element => {
  return (
    <div className="flex w-full justify-center gap-3">
      Loading
      <span className="animate-spin">
        <IconLoader2 height={40} width={40} />
      </span>
    </div>
  );
};

export default Loading;
