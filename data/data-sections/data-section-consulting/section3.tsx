

import Button from "@/components/button"
import ConsultingItemList from "@/components/consulting-item-list"



const header =
    <div className="text-primary-darkTeal">
        <h2 className="text-5xl mt-24 text-center font-light  font-Ralevay_Light">
            <span className="text-primary-lightTeal font-medium">Customised Solutions</span>{' '}
            for Every Project
        </h2>
        <br />
        <h3 className="text-3xl text-center ">
            Understanding that{' '}
            <span className="text-primary-lightTeal font-normal">“one size, does NOT fit all”</span>{/*
  */}, our Consulting Projects are fully adaptable to meet your needs.
            Explore some of the{' '}
            <span className="text-primary-lightTeal font-normal">challenges we can solve together.</span>
        </h3>

    </div>



const content =
    <>
        <ConsultingItemList />

        <div className="flex-col justify-center text-center text-2xl">
            <p className="color-primary-light text-4xl mt-24 pb-8">And much more:</p>
            <p className="py-2">Process Improvements</p>
            <p className="py-2">UI/UX design</p>
            <p className="py-2">Cybersecurity solutions</p>
            <p className="py-2">Digital Transformation Planning</p>
            <p className="py-2">Business idea consultation </p>
            <p className="mt-20 mb-10"> <Button href="/contact" text="Get in touch" /></p>
        </div>
    </>



const element = {
    content: content,
    header: header,
    index: 3,
    padding_bottom: 'pb-40',
    margin_bottom: 'mb-64'
}
export default element