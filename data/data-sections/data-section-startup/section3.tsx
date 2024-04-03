
import StartupsItemList from "@/components/startup-item-list"



const header =
	<h2 className="text-5xl mt-14">
		<div className="text-center ">
			<span className="text-primary-lightTeal">Your</span>{' '}
			<span className="text-primary-darkTeal font-medium">Dream Team</span>
			<br />
		</div>
		<div className="text-center text-primary-darkTeal">
			<span className="text-3xl ">Experts dedicated to their craft and fully committed to your project.</span>
			<br />
		</div>
	</h2>

const content = <StartupsItemList />


const element = {
	content: content,
	header: header,	

	
	index:3,
	padding_bottom: 'pb-40',
	margin_bottom: 'mb-64'
}
export default element