import Image from 'next/image'
import { Search, MapPin, Briefcase } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function HeroSection() {
  const trendingPositions = [
    'Product Designer',
    'AI Engineering',
    'Dev-ops Engineer',
  ]

  return (
    <section className="relative min-h-[90vh] w-full flex flex-col items-center justify-center bg-black text-white overflow-hidden px-4 py-20">
      {/* Background Globe Image */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <Image
          src="/images/globe.png"
          alt="Globe Background"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Soft Radial Gradient Overlay */}
        <div className="absolute inset-0 bg-radial from-transparent via-black/60 to-black" />
      </div>

      <div className="relative z-10 max-w-4xl w-full mx-auto flex flex-col items-center text-center space-y-8">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neutral-800 bg-neutral-900/80 backdrop-blur-md text-xs sm:text-sm text-neutral-300 shadow-inner">
          <Briefcase className="w-4 h-4 text-indigo-400" />
          <span className="font-semibold text-white">50,000+</span>
          <span className="tracking-wider uppercase text-[11px] text-neutral-400">
            New Jobs This Month
          </span>
        </div>

        {/* Main Heading & Subtitle */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white">
            Find Your Dream Job Today
          </h1>
          <p className="text-neutral-400 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
            HireLoop connects top talent with world-class companies. Browse thousands of
            curated opportunities and land your next role — faster.
          </p>
        </div>

        {/* Search Bar Container */}
        <div className="w-full max-w-3xl bg-neutral-950/80 border border-neutral-800 rounded-2xl p-2 sm:p-2.5 backdrop-blur-xl shadow-2xl">
          <form className="flex flex-col md:flex-row items-center gap-2 divide-y md:divide-y-0 md:divide-x divide-neutral-800">
            {/* Job Title / Skill Input */}
            <div className="flex items-center w-full px-3 py-1">
              <Search className="w-5 h-5 text-neutral-400 shrink-0 mr-3" />
              <Input
                type="text"
                placeholder="Job title, skill or company"
                className="bg-transparent border-0 text-white placeholder:text-neutral-500 focus-visible:ring-0 focus-visible:ring-offset-0 px-0 h-10 text-sm sm:text-base"
              />
            </div>

            {/* Location Input */}
            <div className="flex items-center w-full px-3 py-1 pt-2 md:pt-1">
              <MapPin className="w-5 h-5 text-neutral-400 shrink-0 mr-3" />
              <Input
                type="text"
                placeholder="Location or Remote"
                className="bg-transparent border-0 text-white placeholder:text-neutral-500 focus-visible:ring-0 focus-visible:ring-offset-0 px-0 h-10 text-sm sm:text-base"
              />
            </div>

            {/* Search Submit Button */}
            <div className="w-full md:w-auto pt-2 md:pt-0 shrink-0">
              <Button
                type="submit"
                size="icon"
                className="w-full md:w-12 h-12 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-all duration-200"
              >
                <Search className="w-5 h-5" />
                <span className="sr-only">Search Jobs</span>
              </Button>
            </div>
          </form>
        </div>

        {/* Trending Tags */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-2 text-xs sm:text-sm">
          <span className="text-neutral-400 mr-1">Trending Position</span>
          {trendingPositions.map((position) => (
            <Badge
              key={position}
              variant="outline"
              className="bg-neutral-900/60 border-neutral-800 text-neutral-300 hover:bg-neutral-800 hover:text-white px-4 py-2 rounded-full cursor-pointer transition-colors font-normal"
            >
              {position}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  )
}