'use client'

import React, { JSX, useCallback } from 'react'

const DONATE_HREF =
  'https://commerce.coinbase.com/checkout/247b6ffe-fb4e-47a8-9a76-e6b7ef83ea22'

function FooterLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}): JSX.Element {
  return (
    <a
      className="text-stone-600 dark:text-stone-400 underline hover:text-stone-800 dark:hover:text-stone-200"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  )
}

export function Footer(): JSX.Element {
  const handleDonate = useCallback(() => {
    window.location.href = DONATE_HREF
  }, [])

  return (
    <>
      <div className="h-[100px]" /> {/* Spacer to account for footer height */}
      <footer className="fixed bottom-0 left-0 right-0 text-center py-2.5 pb-4 text-xs border-t border-stone-200 dark:border-stone-700 shadow-[0_-1px_2px_rgba(0,0,0,0.04)] dark:shadow-[0_-1px_2px_rgba(255,255,255,0.04)] bg-white dark:bg-stone-900">
        <div className="flex flex-col items-center space-y-1 px-4 sm:px-6 md:px-8">
          <div className="flex items-center space-x-2">
            <p className="text-stone-600 dark:text-stone-400">
              <strong>喜欢 FilePizza v2 吗？</strong> 支持它的开发！{' '}
            </p>
            <button
              className="px-1.5 py-0.5 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-200 font-medium text-[10px]"
              onClick={handleDonate}
            >
              捐赠
            </button>
          </div>

          <p className="text-stone-600 dark:text-stone-400">
            由{' '}
            <FooterLink href="http://kern.io">Alex Kern</FooterLink> 和{' '}
            <FooterLink href="https://github.com/neerajbaid">
              Neeraj Baid
            </FooterLink>{' '}
            在 UC Berkeley 享用 <strong>Sliver</strong> 时开发 lnblxj汉化 &middot;{' '}
            <FooterLink href="https://github.com/kern/filepizza#faq">
              常见问题
            </FooterLink>{' '}
            &middot;{' '}
            <FooterLink href="https://github.com/kern/filepizza">
              在 GitHub 上查看
            </FooterLink>
          </p>
        </div>
      </footer>
    </>
  )
}

export default Footer
