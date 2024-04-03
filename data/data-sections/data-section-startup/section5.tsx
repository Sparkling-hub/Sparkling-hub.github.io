
import StartupStepByStep from "@/components/startup-step-by-step"



const header =
    <div className="pb-20  text-5xl text-center">
            
            <h2 className="font-light text-primary-darkTeal">Launching an{' '}
            <span className="text-primary-yellow font-medium pb-2">MVP in 5 simple steps</span>
            </h2>
            <br/>
            <p className="text-2xl font-light text-teal-700 leading-6">
                Do you have a ground-breaking idea? Want to develop and launch your MVP effectively and affordably?<br/> We have got you covered!
                Our streamlined 5-step process is designed just for that:
            </p>
     


    </div>

const content = <StartupStepByStep />


const element = {
    content: content,
    header: header,

    
    index: 5,

}
export default element