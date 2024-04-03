import Form from "../../../components/form-contact";

const header =
  <h3 className="text-3xl  w-fit m-auto mb-8 text-primary-darkTeal">Fill in the form below and <span className="text-primary-lightTeal">we will get back to you </span>within 24 hours.</h3>


const content = <Form/>


const element = {
  content: content,
  header: header,

  id:"form-contact"
}
export default element