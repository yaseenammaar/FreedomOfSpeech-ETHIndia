/* This example requires Tailwind CSS v2.0+ */
import { Popover } from '@headlessui/react'

export default function Footer() {
  return (
    <Popover className="relative bg-white">
      <footer class="p-4 bg-white rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
        <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">2022 Freedom of Speech.</span>
      </footer>
    </Popover>
  )
}
