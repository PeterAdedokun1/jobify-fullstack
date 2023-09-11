import Wrapper from "../assets/wrappers/StatItem";

interface StatProps{
    count?: number;
    title: string;
    icon: any;
    color: string;
    // bcg?: any
}
const StatItem = ({ count, title, icon, color,  }: StatProps) => {
  return (
      <Wrapper color={color}
        //   bcg={bcg}
      >
      <header>
        <span className="count">{count}</span>
        <span className="icon">{icon}</span>
      </header>
      <h5 className="title">{title}</h5>
    </Wrapper>
  );
};
export default StatItem
