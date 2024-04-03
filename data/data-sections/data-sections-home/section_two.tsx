import Services from "@/components/services"

const header =
  <h1 className="m-auto w-fit  text-primary-lightTeal my-16">

Explore our <strong className="text-primary-darkTeal font-medium">Solutions</strong> 
  </h1>

const content = <Services />

const element = {
  content: content,
  header: header,
  id: "services",
  index: 2,

}
export default element