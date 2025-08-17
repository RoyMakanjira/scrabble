import React from 'react'
import { Button } from './ui/button'
import { Sparkles } from 'lucide-react'
import { authClient } from '@/lib/auth-client'
import Image from 'next/image'

const NavBar = () => {
  return (
         <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Image
            src="/logo.png"
            alt='Scrabble'
            width={40}
            height={40}
            className=''
            />
              <span className="text-xl font-bold text-slate-900">scrabble</span>
            </div>

            {/* Center Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Button variant="ghost" className="text-slate-600 hover:text-slate-900 font-medium">
                Features
              </Button>
              <Button variant="ghost" className="text-slate-600 hover:text-slate-900 font-medium">
                Pricing
              </Button>
              <Button variant="ghost" className="text-slate-600 hover:text-slate-900 font-medium">
                Enterprise
              </Button>
              <Button variant="ghost" className="text-slate-600 hover:text-slate-900 font-medium">
                Help Center
              </Button>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-3">
              <Button variant="ghost" className="text-slate-600 hover:text-slate-900 font-medium">
                Log in
              </Button>
              <Button
                onClick={() =>
                  authClient.signIn.social({
                    provider: "github",
                    callbackURL: "/dashboard",
                    errorCallbackURL: "/login?error=true",
                  })
                }
                className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Get started
              </Button>
            </div>
          </div>
        </div>
      </nav>
  )
}

export default NavBar
