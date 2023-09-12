import Wrapper from "../assets/wrappers/JobInfo";
interface JobInfo{
    icon: any;
    text: string
}
const JobInfo = ({icon,text}: JobInfo) => {
  return (
    <Wrapper>
      <span className="job-icon">{icon}</span>
      <span className="job-text">{text}</span>
    </Wrapper>
  );
}

export default JobInfo