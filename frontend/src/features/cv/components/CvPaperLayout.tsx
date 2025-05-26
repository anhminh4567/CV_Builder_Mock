import { useDroppable } from "@dnd-kit/core";

export interface CvPaperLayoutProps extends React.PropsWithChildren {}
const CvPaperLayout = ({ children }: CvPaperLayoutProps) => {
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable",
  });
  const style: React.CSSProperties = {
    color: isOver ? "green" : undefined,
  };
  return (
    <div className="" style={style} ref={setNodeRef}>
      {children}
    </div>
  );
};

export default CvPaperLayout;
