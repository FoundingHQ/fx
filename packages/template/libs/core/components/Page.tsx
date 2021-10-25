import { ReactNode } from "react";
import { FiSearch, FiBell } from "react-icons/fi";
import { Container, Logo, SidebarNav, ProfileMenu, Button } from "@components";

type Props = {
  title: ReactNode;
  children: ReactNode;
  aside: ReactNode;
};

export const MainLayout = ({ title, children, aside }: Props) => {
  return (
    <Container>
      <header className="sticky top-0 z-50 flex items-stretch w-full h-20 bg-white">
        <div className="hidden lg:flex items-center flex-none border-b border-b-gray-400 w-[200px]">
          <Logo />
        </div>
        <div className="flex items-center flex-auto border-b border-b-gray-400 md:mx-16">
          {title}
        </div>
        <div className="hidden xl:flex items-center flex-none border-b border-b-gray-400 w-[300px] space-x-4 justify-end">
          <Button $shape="rounded" $variant="ghost" $size="sq">
            <span className="sr-only">Search</span>
            <FiSearch className="w-6 h-6" aria-hidden="true" />
          </Button>
          <Button $shape="rounded" $variant="ghost" $size="sq">
            <span className="sr-only">View notifications</span>
            <FiBell className="w-6 h-6" aria-hidden="true" />
          </Button>
          <ProfileMenu />
        </div>
      </header>
      <div className="flex">
        <section className="hidden flex-none w-[200px] lg:block">
          <div className="fixed flex flex-col w-[200px] top-0 pt-20 h-screen">
            <SidebarNav />
          </div>
        </section>
        <main className="flex-auto md:mx-16">{children}</main>
        <aside className="hidden flex-none w-[300px] xl:block">
          <div className="fixed flex flex-col w-[300px] top-0 pt-20 h-screen">
            {aside}
          </div>
        </aside>
      </div>
    </Container>
  );
};
