import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

import { PropsWithChildren } from "react";

const layout = ({ children }: PropsWithChildren) => {
  return (
    <main className="grid lg:grid-cols-5 min-h-screen">
      {/* Sidebar: Pinned on the left on large screens */}
      <aside className="hidden lg:block lg:col-span-1 border-r border-border">
        <div className="sticky top-0 h-screen">
          <Sidebar />
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:col-span-4 flex flex-col">
        <Navbar />
        <section className="flex-1 py-12 px-4 sm:px-8 lg:px-16">
          {children}
        </section>
      </div>
    </main>
  );
};

export default layout;
