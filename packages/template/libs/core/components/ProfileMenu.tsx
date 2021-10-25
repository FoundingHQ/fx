import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { classnames } from "tailwindcss-classnames";

const user = {
  name: "Chelsea Hagon",
  email: "chelseahagon@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

export const ProfileMenu = () => {
  return (
    <Menu as="div" className="relative flex-shrink-0">
      <Menu.Button className="flex rounded-full focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-800">
        <span className="sr-only">Open user menu</span>
        <img className="w-8 h-8 rounded-full" src={user.imageUrl} alt="" />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-black ring-opacity-5 focus:outline-none">
          {userNavigation.map((item) => (
            <Menu.Item key={item.name}>
              {({ active }) => (
                <a
                  href={item.href}
                  className={classnames({
                    block: true,
                    "py-2": true,
                    "px-4": true,
                    "text-sm": true,
                    "text-gray-700": true,
                    "bg-gray-100": active,
                  })}
                >
                  {item.name}
                </a>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
