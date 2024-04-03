
import StartupsTechnologiesIconList from "@/components/startup-technologies-icon-list"



const header = (
  <div className="m-auto my-20 text-center">
    <h2 className="text-5xl font-light text-white mb-5">
      <span className="font-medium">Technologies</span>
      {' '}We Work With{/*
  */}</h2>
    <p className="text-white font-light text-xl">{/*
  */}<span className="font-medium">Front-end, Back-end and DevOps.</span>{' '}
      We use the
      <span className="font-medium"> right tools</span>{' '}
      for
      <span className="font-medium"> the right job!</span>
    </p>
  </div>
);

const content = <StartupsTechnologiesIconList />


const element = {
  content: content,
  header: header,
  id: 'technologies',
  index: 3,

  background: 'bg-color-primary-dark',
}
export default element