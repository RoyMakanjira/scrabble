import React from 'react'
import { Button } from './ui/button'
import { Sparkles, Twitter, Linkedin, Github, Users, Shield } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <Sparkles className="w-7 h-7 text-indigo-400" />
                <span className="text-xl font-bold">scrabble</span>
              </div>
              <p className="text-slate-400 mb-6 leading-relaxed">
                AI-powered tool discovery that transforms chaotic workflows into efficient, productive systems. Discover
                the perfect tools for any task in seconds.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white p-2">
                  <Twitter className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white p-2">
                  <Github className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white p-2">
                  <Linkedin className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Product */}
            <div>
              <h3 className="font-semibold text-white mb-4">Product</h3>
              <ul className="space-y-3">
                <li>
                  <Button variant="ghost" className="text-slate-400 hover:text-white p-0 h-auto font-normal">
                    Features
                  </Button>
                </li>
                <li>
                  <Button variant="ghost" className="text-slate-400 hover:text-white p-0 h-auto font-normal">
                    Integrations
                  </Button>
                </li>
                <li>
                  <Button variant="ghost" className="text-slate-400 hover:text-white p-0 h-auto font-normal">
                    API
                  </Button>
                </li>
                <li>
                  <Button variant="ghost" className="text-slate-400 hover:text-white p-0 h-auto font-normal">
                    Chrome Extension
                  </Button>
                </li>
                <li>
                  <Button variant="ghost" className="text-slate-400 hover:text-white p-0 h-auto font-normal">
                    Mobile App
                  </Button>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-3">
                <li>
                  <Button variant="ghost" className="text-slate-400 hover:text-white p-0 h-auto font-normal">
                    About Us
                  </Button>
                </li>
                <li>
                  <Button variant="ghost" className="text-slate-400 hover:text-white p-0 h-auto font-normal">
                    Careers
                  </Button>
                </li>
                <li>
                  <Button variant="ghost" className="text-slate-400 hover:text-white p-0 h-auto font-normal">
                    Press
                  </Button>
                </li>
                <li>
                  <Button variant="ghost" className="text-slate-400 hover:text-white p-0 h-auto font-normal">
                    Blog
                  </Button>
                </li>
                <li>
                  <Button variant="ghost" className="text-slate-400 hover:text-white p-0 h-auto font-normal">
                    Partners
                  </Button>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-semibold text-white mb-4">Support</h3>
              <ul className="space-y-3">
                <li>
                  <Button variant="ghost" className="text-slate-400 hover:text-white p-0 h-auto font-normal">
                    Help Center
                  </Button>
                </li>
                <li>
                  <Button variant="ghost" className="text-slate-400 hover:text-white p-0 h-auto font-normal">
                    Documentation
                  </Button>
                </li>
                <li>
                  <Button variant="ghost" className="text-slate-400 hover:text-white p-0 h-auto font-normal">
                    Community
                  </Button>
                </li>
                <li>
                  <Button variant="ghost" className="text-slate-400 hover:text-white p-0 h-auto font-normal">
                    Contact Us
                  </Button>
                </li>
                <li>
                  <Button variant="ghost" className="text-slate-400 hover:text-white p-0 h-auto font-normal">
                    Status
                  </Button>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-slate-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-6 text-slate-400 text-sm">
                <span>© 2025 Scrabble. All rights reserved.</span>
                <Button variant="ghost" className="text-slate-400 hover:text-white p-0 h-auto text-sm font-normal">
                  Privacy Policy
                </Button>
                <Button variant="ghost" className="text-slate-400 hover:text-white p-0 h-auto text-sm font-normal">
                  Terms of Service
                </Button>
                <Button variant="ghost" className="text-slate-400 hover:text-white p-0 h-auto text-sm font-normal">
                  Cookie Policy
                </Button>
              </div>

              <div className="flex items-center space-x-4 text-slate-400 text-sm">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>10,000+ users</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4" />
                  <span>SOC 2 Compliant</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
  )
}

export default Footer
