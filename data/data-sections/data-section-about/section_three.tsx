
import About from "@/components/row-aboutus"
const head= <h2 className="text-primary-lightTeal m-auto mt-20 mb-12 text-5xl  w-fit">Our <strong className="text-primary-darkTeal font-bold">Core Principles</strong></h2>
const content =
  <About/>


const element = {
  header: head,
  content:content,
 
  background: '', 
  id: "principle"

}
export default element