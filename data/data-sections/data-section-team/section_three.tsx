import Team from "@/components/row-team";
const head = <h2 className="mx-auto text-primary-darkTeal font-Ralevay_Ligh my-16 font-5 w-fit text-4xl">Why <strong className="text-teal-700">Working With Us?</strong></h2>
const content = (<Team/>
);


const element = {
  header:head,
  content: content,
  background: '', 
  index: 3,
  id: 'team'
};
export default element;
