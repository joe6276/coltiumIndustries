import { ArrowUpRight, Star } from 'lucide-react'

interface Testimonial {
  name: string
  initials: string
  quote: string
}

const testimonials: Testimonial[] = [
  {
    name: 'Jack Nyabuti',
    initials: 'JN',
    quote: "I like the product design approach coltium industries uses to ensure client's product expectations are met.",
  },
  {
    name: "Romanov O'connor",
    initials: 'RO',
    quote: "Coltium industries helped me bring a data analysis project into life.I'd recommend them for any product design and development projects.",
  },
  {
    name: 'mine yours',
    initials: 'MY',
    quote: 'These guys really make it easy to adopt new technology.I never knew i could adopt AI practices into my product in a sustainable manner.Please check coltium industries.',
  },
]

export default function Testimonials() {
  return (
    <section className="bg-slate-100 py-16 md:py-24" aria-labelledby="testimonials-heading">
      <div className="container">
        <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">Selected Google reviews</p>
            <h2 id="testimonials-heading" className="max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-primary md:text-5xl">What people say about Coltium.</h2>
          </div>
          <div className="shrink-0">
            <div className="mb-2 flex items-center gap-3">
              <span className="text-3xl font-semibold text-primary" aria-hidden="true">5.0</span>
              <span className="flex gap-1 text-amber-500" aria-hidden="true">
                {Array.from({ length: 5 }, (_, index) => <Star key={index} size={20} fill="currentColor" />)}
              </span>
            </div>
            <a
              href="https://maps.app.goo.gl/4VCgQ9zq7CwMLM2aA"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex min-h-11 items-center gap-2 font-semibold text-primary underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500"
            >
              Read all reviews on Google
              <ArrowUpRight size={18} aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {testimonials.map(testimonial => (
            <figure key={testimonial.name} className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-7 sm:p-9">
              <blockquote className="flex-1 text-lg leading-relaxed text-slate-700">
                <p>“{testimonial.quote}”</p>
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-3 border-t border-slate-100 pt-6">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-primary" aria-hidden="true">{testimonial.initials}</span>
                <div>
                  <p className="font-semibold text-primary">{testimonial.name}</p>
                  <p className="mt-1 text-sm text-slate-500">Reviewed on Google</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
