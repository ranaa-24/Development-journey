import logo from './assets/logo.png'
import banner from './assets/banner.jpg'
import { ArrowPathIcon, CloudArrowUpIcon, FingerPrintIcon, LockClosedIcon } from '@heroicons/react/24/outline'

export default function App() {
  return (
    <div className="container mx-auto ">
      <header>
        <section className="md:h-screen grid grid-cols-1 md:grid-cols-2 justify-items-center items-center">
          <div className="w-3/4">
            <img src={logo} alt="Logo" className='w-64 m-auto' />

            <h1 className='text-5xl tracking-tight text-slate-800 font-bold text-pretty'>And in her smile, I see something more beautiful than the stars.</h1>
            <p className='my-3'>Every soft smile carries a world of untold stories, and within each world, it is her presence that gives it meaning, light, and life.</p>
            <ul className='flex gap-2 mt-6 '>
              <li><a href="#" className='transition ease-out  duration-200 bg-orange-400 hover:bg-orange-500 px-4 py-2 rounded-lg font-[600] text-white'>Read Our Story</a></li>
              <li><a href="#" className='transition ease-out  duration-200 bg-slate-600 hover:bg-slate-800 px-4 py-2 rounded-lg font-[600]  text-white' >Gallery</a></li>
            </ul>
          </div>

          <img src={banner} alt="" className=' mt-6 md:mt-0 md:h-screen' />
        </section>

        <section>
          <Features/>
        </section>
      </header>
    </div>
  )
}

//from tailwind components
function Features() {

  const features = [
    {
      name: ' Moments That Matter',
      description:
        'Every look, every touch, and every laugh — they build a story you never want to stop reading.',
      icon: CloudArrowUpIcon,
    },
    {
      name: 'Love That’s Secure',
      description:
        'Built on trust and understanding, where hearts feel safe, seen, and held gently.',
      icon: LockClosedIcon,
    },
    {
      name: 'Simple Beginnings',
      description:
        'The best stories start softly — a glance, a shared silence, a moment that lingers.',
      icon: ArrowPathIcon,
    },
    {
      name: 'A Deeper Bond',
      description:
        'More than a connection — it’s a promise, an unspoken language written in smiles and stardust.',
      icon: FingerPrintIcon,
    },
  ]

  return (
    <div className="bg-white lg:h-screen py-10 flex items-center justify-center">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base/7 font-semibold text-orange-400">A Love That Grows</h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance">
           Everything You Need to Tell a Love Story
          </p>
          <p className="mt-6">
           From quiet smiles to stardust skies, every piece is crafted to bring a gentle story to life. Love isn’t rushed — it’s revealed, one tender moment at a time.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className=" grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16 ">
                <dt className="text-base/7 font-semibold text-gray-900">
                  <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-orange-400 ">
                    <feature.icon aria-hidden="true" className="size-6 text-white" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}