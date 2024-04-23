import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

import Container from "./Container";

import { Link, NavLink } from "react-router-dom";

import useUserStore from "../hooks/useUserStore";

export default function Navbar() {
  const { user } = useUserStore();

  return (
    <Disclosure as="nav" className="bg-gray-950 shadow text-white">
      {({ open }) => (
        <>
          <Container>
            <div className="flex h-16 justify-between">
              <div className="flex justify-between w-full">
                <div className="flex flex-shrink-0 items-center">
                  <Link to="/" className="">
                    <h1 className="font-serif font-bold text-2xl text-rose-500">
                      FGC Hub
                    </h1>
                  </Link>
                </div>

                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {user ? (
                    <>
                      <DesktopNavLink to="products">Products</DesktopNavLink>
                      <DesktopNavLink to="cart">Cart</DesktopNavLink>
                      <DesktopNavLink to="orders">Orders</DesktopNavLink>
                      <DesktopNavLink to="profile">Profile</DesktopNavLink>
                    </>
                  ) : (
                    <>
                      <DesktopNavLink to="register">
                        Create Account
                      </DesktopNavLink>
                      <DesktopNavLink to="login">Login</DesktopNavLink>
                      <DesktopNavLink to="products">Products</DesktopNavLink>
                      <DesktopNavLink to="cart">Cart</DesktopNavLink>
                    </>
                  )}
                </div>
              </div>

              <div className="-mr-2 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-rose-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </Container>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pb-3 pt-2">
              {user ? (
                <>
                  <MobileNavLink to="products">Products</MobileNavLink>
                  <MobileNavLink to="cart">Cart</MobileNavLink>
                  <MobileNavLink to="orders">Orders</MobileNavLink>
                  <MobileNavLink to="profile">Profile</MobileNavLink>
                </>
              ) : (
                <>
                  <MobileNavLink to="register">Create Account</MobileNavLink>
                  <MobileNavLink to="login">Login</MobileNavLink>
                  <MobileNavLink to="products">Products</MobileNavLink>
                  <MobileNavLink to="cart">Cart</MobileNavLink>
                </>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

function DesktopNavLink({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${
          isActive
            ? "border-rose-500 text-gray-100"
            : "border-transparent text-gray-300 hover:border-gray-300 hover:text-gray-200"
        }`
      }
    >
      {children}
    </NavLink>
  );
}

function MobileNavLink({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `block border-l-4 py-2 pl-3 pr-4 text-base font-medium ${
          isActive
            ? "bg-rose-50 border-rose-500 text-rose-700"
            : "border-transparent text-gray-200 hover:bg-gray-600 hover:border-gray-300"
        }`
      }
    >
      <Disclosure.Button as="div">{children}</Disclosure.Button>
    </NavLink>
  );
}
