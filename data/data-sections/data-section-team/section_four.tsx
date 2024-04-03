
import RowTeam from "@/components/team-roles";
const head = <div className="flex flex-col items-center mb-14 text-center font-light text-primary-darkTeal"><h2 className="font-5 text-5xl mb-5">Forge your <strong className="text-primary-lightTeal font-semibold">dream team</strong>!</h2>
 <h3 className="text-2xl text-primary-darkTeal font-light">Experts <strong className="text-primary-lightTeal font-semibold">dedicated </strong>to their craft and <strong className="text-primary-lightTeal font-semibold">fully committed</strong>  to your project.</h3>
 </div>
const content = (<RowTeam/>
);


const element = {
  header:head,
  content: content,

  index: 3,
  id: 'team'
};
export default element;
