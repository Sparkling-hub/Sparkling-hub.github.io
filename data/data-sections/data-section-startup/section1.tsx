
const header =
  <h1 className="text-5xl mb-10 text-primary-darkTeal">
    <span className="font-bold">Start-up</span> <br />
  </h1>

const content =
  <div className="text-xl  text-primary-darkTeal">
    <p>Over the last decade, we have collaborated with more than 20 start-ups, spanning from pre-seed stages to Series A, helping entrepreneurs in transforming their ideas into reality and supporting others in scaling and iterating.</p>
    </div>


const image = <img src='/img/startup/logo.svg' className="w-full" alt="startup_icon" />;

const element = {
  content: content,
  header: header,
  image: image,
  padding_bottom: "pb-40 custom-pb-60",
  index: 1,

}
export default element