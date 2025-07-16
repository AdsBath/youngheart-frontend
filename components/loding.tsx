import { IconLoader } from "@tabler/icons-react";

const Loading = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <IconLoader size={25} className="text-muted-foreground animate-spin" />
      <span className='sr-only'>loading</span>
    </div>
  );
};

export default Loading;
