


const header =
    <h2 className="text-5xl mx-auto w-fit mt-12 mb-28 text-primary-darkTeal">
        How{" "}
        <span className="text-primary-lightTeal font-medium">We Work</span>

    </h2>

const content = <div className="we-work-container relative my-10 h-96">
    <div className="arrow absolute h-96">
        <img src='/img/consulting/arrow_consulting.png' className="h-96" alt="we-work" />
    </div>
    <ul className="h-96 flex flex-col justify-around text-xl font-light text-primary-darkTeal">
        <li className="pl-32 "><span className="rounded-full bg-color-primary-light-light pl-8 xl:pr-32 pt-2 pb-3">Analyse the issue and its roots.</span></li>
        <li className="pl-48"><span className="rounded-full bg-color-primary-light-light pl-8 xl:pr-32 pt-2 pb-3">Evaluate the technical architecture of the project.</span></li>
        <li className="pl-64"><span className="rounded-full bg-color-primary-light-light pl-8 xl:pr-32 pt-2 pb-3">Plan a solution with your company tailoring it to its needs.</span></li>
        <li className="pl-48"><span className="rounded-full bg-color-primary-light-light pl-8 xl:pr-32 pt-2 pb-3">Implement new changes in the ecosystem and iterate if needed.</span></li>
        <li className="pl-32"><span className="rounded-full bg-color-primary-light-light pl-8 xl:pr-32 pt-2 pb-3">Keep it working! Supporting you also once the project is finished. Always ready to help.</span></li>
    </ul>
</div>

const element = {
    content: content,
    header: header,

    
    index: 5,
    padding_bottom: 'pb-40',
    margin_bottom: 'mb-64'
}
export default element