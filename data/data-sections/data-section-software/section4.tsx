

import Manifest from "@/components/manifest"
const header =
    <div className="text-center mt-12 mb-20 lg:w-2/3 mx-auto font-light text-primary-darkTeal">
        <h2 className="text-5xl mb-4">
            <strong className="text-primary-lightTeal font-bold">Agile</strong> with a kick
        </h2>
        <p className="text-center text-lg font-normal leading-8">
            As passionate believers in the agile manifesto we champion iterative development, embracing retrospectives,
            nurturing genuine knowledge sharing and transparent communication.
            These values fuel our synergy and allows us to deliver greater products.
        </p>
    </div>
const content = <><Manifest />
    <h2 className="text-center text-5xl mb-6 mt-20 text-primary-darkTeal">Adaptability at <strong className="text-primary-lightTeal font-bold">its best</strong></h2>
    <p className="text-center  text-lg mb-30 text-primary-darkTeal">
        Utilising Scrum and Kanban frameworks, we embrace flexibility, prepared to tackle surprises head-on.
        <br />
        This helps us staying on track and maintain the workflow smooth and uninterrupted.
    </p>
</>
const element = {
    content: content,
    header: header,
    index: 4,

}
export default element