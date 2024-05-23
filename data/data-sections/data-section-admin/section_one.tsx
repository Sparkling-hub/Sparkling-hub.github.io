

import Auth from '@/components/authorization/authorization'
const header =
  <h1 className="text-5xl my-4 mx-1 text-primary-darkTeal font-bold mb-10"></h1>
 
const content = <div className='flex'>
  <div  className='w-[500px] m-auto  border-green-800'><Auth/></div>
</div>




const element = {
  content: content,
  header: header,
  id: "about"

}
export default element