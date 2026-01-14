// src/App.jsx
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Use images from our local assets folder for the hero gallery
import firstImage from "./assets/first_image.webp";
import secondImage from "./assets/second_image.webp";
import thirdImage from "./assets/third_image.webp";
import fourthImage from "./assets/fourth_image.webp";
import fifthImage from "./assets/fifth_image.webp";
import sixthImage from "./assets/sixth_image.webp";
import seventhImage from "./assets/seventh_image.webp";
import getItSold1 from "./assets/get_it_sold_1.webp";
import getItSold2 from "./assets/get_it_sold_2.webp";
import getItSold3 from "./assets/get_it_sold_3.webp";
import marcyImage from "./assets/marcy.webp";
import footer1 from "./assets/footer_1.webp";
import footer2 from "./assets/footer_2.webp";
import footer3 from "./assets/footer_3.webp";
import footer4 from "./assets/footer_4.webp";

const HERO_CAROUSEL_IMAGES = [
  firstImage,
  secondImage,
  thirdImage,
  fourthImage,
  fifthImage,
  sixthImage,
  seventhImage,
];

function App() {
  const pageRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Intro hero text on initial load
      gsap.from("[data-hero-copy]", {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
        delay: 0.1,
      });

      // Hero section fades out as you scroll down
      gsap.to("[data-hero-section]", {
        opacity: 0,
        y: -80,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "[data-hero-section]",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Each major section (below hero) fades and slides up on scroll
      gsap.utils.toArray("[data-section]").forEach((section, index) => {
        gsap.from(section, {
          opacity: 0,
          y: 40,
          duration: 0.9,
          ease: "power3.out",
          delay: index * 0.05,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      });

      // Groups of elements that should stagger in together
      gsap.utils.toArray("[data-fade-up-group]").forEach((group) => {
        const items = group.querySelectorAll("[data-fade-up]");
        if (!items.length) return;

        gsap.from(items, {
          opacity: 0,
          y: 24,
          stagger: 0.15,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: group,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });

      // Text-specific animations: reveal words smoothly on scroll
      gsap.utils.toArray("[data-animate-text]").forEach((node) => {
        const el = node;
        const originalText = el.textContent || "";
        if (!originalText.trim()) return;

        // Split into words and rebuild with spans for clipping/translation
        const words = originalText.split(" ");
        el.innerHTML = words
          .map(
            (word) =>
              `<span class="inline-block overflow-hidden align-baseline"><span class="inline-block will-change-transform">${word}</span></span>`
          )
          .join(" ");

        const innerSpans = el.querySelectorAll("span span");
        if (!innerSpans.length) return;

        gsap.set(innerSpans, { yPercent: 120, opacity: 0 });

        gsap.to(innerSpans, {
          yPercent: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.04,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={pageRef}
      className="min-h-screen bg-slate-950 text-slate-50 font-sans"
    >
      {/* Page container */}
      <div className="mx-auto w-full">

        {/* Intro / Hero (no contact details, just brand intro over background) */}
        <section
          data-section
          data-hero-section
          className="relative overflow-hidden min-h-screen"
        >
          {/* Header */}
          <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-6 sm:px-10 lg:px-14">
            <div className="flex items-center gap-4">
              <img
                src="https://img1.wsimg.com/isteam/ip/067a4d42-19e8-46d9-9bed-578bf62dd44e/blob-6c0c2e0.png/:/rs=w:536,h:167,cg:true,m/cr=w:536,h:167/qt=q:95"
                alt="Marci Metzger Homes logo"
                className="h-13 w-auto sm:h-15"
              />
              <div className="flex flex-col">
              </div>
            </div>

            <nav className="hidden items-center gap-8 text-sm text-slate-100 md:flex">
              <a href="#about" className="hover:text-rose-200 transition-colors">
                About
              </a>
              <a
                href="#services"
                className="hover:text-rose-200 transition-colors"
              >
                Services
              </a>
              <a
                href="#contact"
                className="hover:text-rose-200 transition-colors"
              >
                Contact
              </a>
              <a
                href="tel:+12069196886"
                className="rounded-full bg-rose-300/90 px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-rose-200"
              >
                Call (206) 919-6886
              </a>
            </nav>
          </header>
          {/* Background image */}
          <div
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url('https://img1.wsimg.com/isteam/ip/067a4d42-19e8-46d9-9bed-578bf62dd44e/mtn%20falls%20pond.jpg/:/rs=w:1920,m')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-950/50 via-slate-950/70 to-slate-950/90" />

          <div className="relative z-10 mx-auto max-w-6xl px-6 pb-20 pt-6 sm:px-10 sm:pb-28 sm:pt-10 lg:px-14 lg:pb-32 lg:pt-12">
            <div
              data-hero-copy
              className="mt-10 max-w-2xl space-y-3 sm:space-y-4 md:space-y-5"
            >
              <p
                data-animate-text
                className="text-1xl font-semibold tracking-[0.3em] uppercase text-rose-200/90" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}
              >
                The Ridge Realty Group
              </p>
              <h1
                data-animate-text
                className="text-5xl font-semibold leading-tight tracking-tight text-white"
                style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}
              >
                Marci Metzger Homes
              </h1>
              <p
                data-animate-text
                className="mt-5 max-w-2xl text-base leading-snug text-slate-100 sm:text-lg"
                style={{ fontFamily: '"STIX Two Text", sans-serif' }}
              >
                Discover premium residential and commercial properties in Pahrump
                and Southern Nevada. A community designed for comfort, security,
                and long-term investment growth.
              </p>

              {/* Key Stats */}
              <div className="mt-8 flex flex-wrap items-center gap-7 text-base text-slate-200 sm:gap-10">
                <div className="flex items-center gap-2">
                  <span className="text-rose-200 text-lg font-semibold">30+</span>
                  <span className="text-slate-300">Years Experience</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-rose-200 text-lg font-semibold">Managing Broker</span>
                  <span className="text-slate-300">• Owner</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-rose-200 text-lg font-semibold">Pahrump & Las Vegas</span>
                  <span className="text-slate-300">Area</span>
                </div>
              </div>

              {/* Call-to-Action Buttons */}
              <div className="mt-9 flex flex-wrap items-center gap-5">
                <a
                  href="#services"
                  className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-base font-semibold text-slate-900 transition hover:bg-slate-100"
                >
                  Explore Properties
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-full border-2 border-white/80 bg-transparent px-7 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition hover:border-white hover:bg-white/10"
                >
                  Contact Marci
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery / Carousel section */}
        <section
          data-section
          className="min-h-screen flex flex-col items-center justify-center py-0"
        >
          <div
            className="flex flex-col items-center gap-10 sm:gap-12 text-center"
            data-fade-up-group
          >
            <div data-fade-up className="space-y-4 sm:space-y-5">
              <p
                data-animate-text
                className="text-1xl font-semibold tracking-[0.3em] uppercase text-rose-200/90" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}
              >
                Featured views
              </p>
              <h2
                data-animate-text
                className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl py-2 m-3" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}
              >
                A glimpse of Pahrump &amp; Southern Nevada living
              </h2>
              <p
                data-animate-text
                className="mx-auto max-w-3xl text-base leading-relaxed text-slate-300 sm:text-lg"
              >
                Explore a rotating gallery of local scenery and lifestyle
                moments that capture the character of the communities Marci
                serves.
              </p>
            </div>

            <div className="w-full max-w-5xl" data-fade-up>
              <HeroCarousel />
            </div>
          </div>
        </section>

        {/* Get It Sold section */}
        <section
          data-section
          className="py-16 sm:py-20"
        >
          <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-14" data-fade-up-group>
            <div className="space-y-3 sm:space-y-4 text-center mb-10" data-fade-up>
              <p
                data-animate-text
                className="text-xs font-semibold tracking-[0.3em] uppercase text-rose-200/90"
                style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}
              >
                Get it sold
              </p>
              <h2
                data-animate-text
                className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl"
                style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}
              >
                Showcase your home the way it deserves
              </h2>
              <p
                data-animate-text
                className="mx-auto max-w-3xl text-base leading-relaxed text-slate-300 sm:text-lg"
              >
                Through strategic marketing, professional visuals, and expert staging, Marci positions your property to attract buyers and achieve top market value.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3" data-fade-up-group>
              <GetItSoldCard
                image={getItSold1}
                title="Top Yearly Residential Sales"
                body="We helped nearly 90 clients in 2021 and closed $28.5M in sales. Our team continuously grows and improves to deliver even better results for our clients every year."
              />
              <GetItSoldCard
                image={getItSold2}
                title="Don't Just List it"
                body="Get it SOLD! We exhaust every avenue to ensure our listings are at the fingertips of every possible buyer, getting you top dollar for your home."
              />
              <GetItSoldCard
                image={getItSold3}
                title="Guide to Buyers"
                body="Nobody knows the market like we do. Enjoy having a pro at your service. Market analysis, upgrades lists, contractors on speed dial, & more!"
              />
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" data-section className="py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-14">
            <div className="mb-12 text-center" data-fade-up>
              <p
                data-animate-text
                className="text-xs font-semibold tracking-[0.3em] uppercase text-rose-200/90"
                style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}
              >
                Our Services
              </p>
              <h2
                data-animate-text
                className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl"
                style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}
              >
                What Marci can do for you
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-3 mb-12" data-fade-up-group>
              <ServiceCard
                title="Real Estate Done Right"
                body="Nervous about your property adventure? Don't be. Whether you're getting ready to buy or sell your residence, looking at investment properties, or just curious about the markets, Marci ensures you get the best experience possible."
              />
              <ServiceCard
                title="Commercial & Residential"
                body="Large or small, condo or mansion, we can find it and get it at the price that's right. Fixer-uppers? Luxury? We can help with all of it! We live, work, and play in this community. Happy to help you find where to put your hard-earned dollars."
              />
              <ServiceCard
                title="Rely on Expertise"
                body="If you have questions about affordability, credit, and loan options, trust Marci to connect you with the right people to get the answers you need in a timely fashion. We make sure you feel confident and educated every step of the way."
              />
            </div>

            <div className="flex flex-col items-center gap-8 md:flex-row md:items-center md:justify-center" data-fade-up>
              <div className="relative w-full max-w-xs md:max-w-sm">
                <div className="aspect-square overflow-hidden rounded-full">
                  <img
                    src={marcyImage}
                    alt="Marci Metzger"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="flex-1 max-w-2xl text-center md:text-left">
                <h3
                  data-animate-text
                  className="text-2xl font-semibold text-white mb-4"
                  style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}
                >
                  Your trusted real estate partner
                </h3>
                <p
                  data-animate-text
                  className="text-base leading-relaxed text-slate-300 sm:text-lg"
                >
                  With nearly three decades of experience and a deep understanding of the Pahrump and Southern Nevada markets, Marci brings expertise, dedication, and personalized service to every transaction. Whether you're buying your first home, selling a property, or exploring investment opportunities, you'll have a partner who listens, guides, and delivers results.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Property Search Section */}
        <section
          data-section
          className="relative min-h-[600px] sm:min-h-[700px] overflow-hidden"
        >
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1920&q=80"
              alt="Dream home"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/50 to-slate-950/70" />
          </div>

          {/* Content */}
          <div className="relative z-10 mx-auto max-w-6xl px-6 py-16 sm:px-10 sm:py-20 lg:px-14">
            {/* Heading */}
            <div className="mb-8 text-center">
              <h2
                data-animate-text
                className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl"
                style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}
              >
                FIND YOUR DREAM HOME
              </h2>
            </div>

            {/* Search Form */}
            <div className="mx-auto max-w-5xl rounded-2xl bg-white/95 p-6 shadow-2xl backdrop-blur-sm sm:p-8 lg:p-10">
              <h3
                className="mb-6 text-2xl font-semibold text-slate-800"
                style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}
              >
                SEARCH LISTINGS
              </h3>

              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  // Frontend only - no actual search
                }}
              >
                {/* First Row */}
                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Location
                    </label>
                    <input
                      type="text"
                      placeholder="Enter location"
                      className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-300/20"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Type
                    </label>
                    <select className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 focus:border-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-300/20">
                      <option value="">Select type</option>
                      <option value="house">House</option>
                      <option value="condo">Condo</option>
                      <option value="townhouse">Townhouse</option>
                      <option value="land">Land</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Sort By
                    </label>
                    <select className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 focus:border-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-300/20">
                      <option value="newest">Newest First</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="relevance">Relevance</option>
                    </select>
                  </div>
                </div>

                {/* Second Row */}
                <div className="grid gap-4 sm:grid-cols-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Bedrooms
                    </label>
                    <select className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 focus:border-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-300/20">
                      <option value="">Any Number</option>
                      <option value="1">1+</option>
                      <option value="2">2+</option>
                      <option value="3">3+</option>
                      <option value="4">4+</option>
                      <option value="5">5+</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Baths
                    </label>
                    <select className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 focus:border-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-300/20">
                      <option value="">Any Number</option>
                      <option value="1">1+</option>
                      <option value="2">2+</option>
                      <option value="3">3+</option>
                      <option value="4">4+</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Min Price
                    </label>
                    <input
                      type="text"
                      placeholder="$0"
                      className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-300/20"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Max Price
                    </label>
                    <input
                      type="text"
                      placeholder="No max"
                      className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-300/20"
                    />
                  </div>
                </div>

                {/* Search Button */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="rounded-lg bg-slate-200 px-8 py-3 font-semibold uppercase text-slate-800 transition hover:bg-slate-300"
                    style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}
                  >
                    SEARCH NOW
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section
          id="contact"
          data-section
          className="mb-20 border-t border-slate-800/60 pt-12 sm:pt-16"
        >
          <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-14">
            <div
              className="grid gap-12 md:grid-cols-2 md:items-start"
              data-fade-up-group
            >
              {/* Left Column: Send Message Form */}
              <div data-fade-up className="space-y-6">
                <h2
                  data-animate-text
                  className="text-2xl font-semibold tracking-tight text-white sm:text-3xl"
                  style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}
                >
                  Send Message
                </h2>
                <form className="space-y-6 text-sm">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-slate-300 mb-2"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      className="w-full border-b border-slate-700 bg-transparent px-0 py-2 text-sm text-slate-50 outline-none transition focus:border-rose-300"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-slate-300 mb-2"
                    >
                      Email<span className="text-rose-300">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      className="w-full border-b border-slate-700 bg-transparent px-0 py-2 text-sm text-slate-50 outline-none transition focus:border-rose-300"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-slate-300 mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      className="w-full border-b border-slate-700 bg-transparent px-0 py-2 text-sm text-slate-50 outline-none transition focus:border-rose-300 resize-none"
                    />
                  </div>

                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-lg bg-slate-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-600"
                  >
                    SEND
                  </button>

                  <p className="text-xs text-slate-400">
                    This site is protected by reCAPTCHA and the Google Privacy
                    Policy and Terms of Service apply.
                  </p>
                </form>
              </div>

              {/* Right Column: Call or Visit */}
              <div data-fade-up className="space-y-6">
                <h2
                  data-animate-text
                  className="text-xl font-semibold tracking-tight text-slate-400 text-center"
                  style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}
                >
                  CALL OR VISIT
                </h2>

                <a
                  href="https://wa.me/12069196886"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-lg bg-slate-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-600"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  Message us on WhatsApp
                </a>

                <div className="space-y-4 text-sm text-slate-300">
                  <div>
                    <p
                      className="font-bold text-white mb-2"
                      data-animate-text
                      style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}
                    >
                      Marci Metzger - THE RIDGE REALTY GROUP
                    </p>
                    <p className="text-slate-300" data-animate-text>
                      3190 HW-160, Suite F, Pahrump, Nevada 89048, United States
                    </p>
                  </div>

                  <div>
                    <p className="text-slate-300" data-animate-text>
                      <a
                        href="tel:+12069196886"
                        className="hover:text-rose-200 transition"
                      >
                        (206) 919-6886
                      </a>
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p
                      className="font-bold text-white"
                      data-animate-text
                      style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}
                    >
                      Office Hours
                    </p>
                    <p className="text-slate-300" data-animate-text>
                      Open today 08:00 am - 07:00 pm
                    </p>
                    <p className="text-slate-300" data-animate-text>
                      Open daily 8:00 am - 7:00 pm
                    </p>
                    <p className="text-sm text-slate-400 mt-2" data-animate-text>
                      Appointments outside office hours available upon request.
                      Just call!
                    </p>
                  </div>
                </div>

                {/* Google Maps Embed */}
                <div className="mt-6 w-full overflow-hidden rounded-lg">
                  <iframe
                    src="https://www.google.com/maps?q=3190+Hwy+160+Suite+F,+Pahrump,+NV+89048&output=embed"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Marci Metzger Office Location"
                    className="w-full h-[300px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-slate-800/60 py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-14">
            {/* Footer Images */}
            <div className="mb-8 flex flex-wrap items-center justify-center gap-6 sm:gap-8">
              <div className="flex items-center justify-center">
                <img
                  src={footer1}
                  alt="The Ridge Realty Group"
                  className="h-12 w-auto object-contain opacity-80 transition-opacity duration-300 hover:opacity-100 sm:h-14"
                  loading="lazy"
                />
              </div>
              <div className="flex items-center justify-center">
                <img
                  src={footer2}
                  alt="Equal Housing Opportunity"
                  className="h-12 w-auto object-contain opacity-80 transition-opacity duration-300 hover:opacity-100 sm:h-14"
                  loading="lazy"
                />
              </div>
              <div className="flex items-center justify-center">
                <img
                  src={footer3}
                  alt="REALTOR"
                  className="h-12 w-auto object-contain opacity-80 transition-opacity duration-300 hover:opacity-100 sm:h-14"
                  loading="lazy"
                />
              </div>
              <div className="flex items-center justify-center">
                <img
                  src={footer4}
                  alt="Pahrump Valley Chamber of Commerce"
                  className="h-12 w-auto object-contain opacity-80 transition-opacity duration-300 hover:opacity-100 sm:h-14"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Social Media Links */}
            <div className="mb-6 flex items-center justify-center gap-6 border-t border-slate-800/60 pt-6">
              <a
                href="https://www.facebook.com/MarciHomes/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 transition-colors hover:text-rose-200"
                aria-label="Facebook"
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/marci-metzger-30642496/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 transition-colors hover:text-rose-200"
                aria-label="LinkedIn"
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://www.yelp.com/biz/marci-metzger-the-ridge-realty-pahrump"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 transition-colors hover:text-rose-200"
                aria-label="Yelp"
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 0L9.5 4.5L4.5 3L3 8L0 8L2 12L0 16L3 16L4.5 21L9.5 19.5L12 24L14.5 19.5L19.5 21L21 16L24 16L22 12L24 8L21 8L19.5 3L14.5 4.5L12 0Z" />
                </svg>
              </a>
            </div>

            {/* Footer Text */}
            <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-800/60 pt-6 text-xs text-slate-400 sm:flex-row">
              <p>
                © {new Date().getFullYear()} Marci Metzger Homes. All rights
                reserved.
              </p>
              <p className="text-[0.7rem]">
                Local Business • Pahrump, Nevada • Real Estate Agent &amp;
                Realtor
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

function HeroCarousel() {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    if (!containerRef.current || !HERO_CAROUSEL_IMAGES.length) return;

    const ctx = gsap.context(() => {
      const slides = gsap.utils.toArray(
        containerRef.current.querySelectorAll("[data-carousel-slide]")
      );
      if (!slides.length) return;

      // Stack slides and hide all but the first
      gsap.set(slides, {
        position: "absolute",
        inset: 0,
        autoAlpha: 0,
      });
      gsap.set(slides[0], { autoAlpha: 1 });

      // Autoplay crossfade between slides
      const tl = gsap.timeline({
        repeat: -1,
        defaults: { ease: "power2.inOut" },
      });

      slides.forEach((slide, index) => {
        if (index === 0) return;

        // Crossfade from previous slide to this one
        tl.to(slide, { autoAlpha: 1, duration: 1.0 }, "+=2.0");
        tl.to(slides[index - 1], { autoAlpha: 0, duration: 1.0 }, "<");
      });

      // Crossfade back to the first slide
      if (slides.length > 1) {
        tl.to(slides[0], { autoAlpha: 1, duration: 1.0 }, "+=2.0");
        tl.to(
          slides[slides.length - 1],
          { autoAlpha: 0, duration: 1.0 },
          "<"
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-6xl lg:max-w-6xl aspect-[16/9] overflow-hidden rounded-2xl border border-slate-800/60 bg-slate-900/60"
    >
      {HERO_CAROUSEL_IMAGES.map((src, index) => (
        <div
          key={src}
          data-carousel-slide
          className="relative h-full w-full"
        >
          <img
            src={src}
            alt={`Marci Metzger Homes gallery image ${index + 1}`}
            className="h-full w-full object-cover saturate-110 contrast-105"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/40 via-slate-950/10 to-transparent" />
        </div>
      ))}
    </div>
  );
}

function ServiceCard({ title, body }) {
  return (
    <div
      className="flex flex-col justify-between space-y-4"
      data-fade-up
    >
      <div>
        <h3
          data-animate-text
          className="text-xl font-semibold text-white mb-3"
          style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}
        >
          {title}
        </h3>
        <p
          data-animate-text
          className="text-sm leading-relaxed text-slate-300 sm:text-base"
        >
          {body}
        </p>
      </div>
    </div>
  );
}

function GetItSoldCard({ image, title, body }) {
  return (
    <article
      className="flex flex-col overflow-hidden rounded-2xl border border-slate-800/60 bg-slate-900/70 shadow-lg shadow-black/30"
    >
      <div className="aspect-[4/3] w-full overflow-hidden relative isolate">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
          style={{
            transform: "translateZ(0)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden"
          }}
          loading="lazy"
        />
      </div>
      <div className="flex flex-1 flex-col px-5 py-5 sm:px-6 sm:py-6 gap-2">
        <h3
          data-animate-text
          className="text-lg font-semibold text-white"
          style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}
        >
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-slate-300">{body}</p>
      </div>
    </article>
  );
}

export default App;