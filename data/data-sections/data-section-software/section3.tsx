import Button from "@/components/button";
import Card from '@/components/software'

const header =
<div className="text-center mt-12 mb-8 text-primary-darkTeal">
    <h2 className="text-5xl m-4">From <strong className="text-primary-lightTeal font-bold">Start</strong> to <strong className="font-bold text-primary-lightTeal">Launch</strong></h2>
    <p className="text-center text-xl">Unlock the potential of your team in <strong className="text-primary-lightTeal font-bold">4 simple steps:</strong> </p>
</div>
const content =
<Card/>

const button = <div className="	<h2 className= text-xl text-center mt-12"> <Button href="/contact#form-contact" text="Let’s get started"/></div>;
const element = {
    content: content,
    header: header,


    index: 3,
    margin_bottom: 'mb-12',
    button:button
}
export default element