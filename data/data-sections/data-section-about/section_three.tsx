
import Gallery from "@/components/galleryAbout"
const head= <h2 className="text-primary-lightTeal m-auto mt-20 mb-12 text-5xl  w-fit">Our <strong className="text-primary-darkTeal font-bold">Core Principles</strong></h2>
const content =
  <Gallery  />


const element = {
  header: head,
  content:content,
 
  background: '', 
  id: "about_teem"

}
export default element