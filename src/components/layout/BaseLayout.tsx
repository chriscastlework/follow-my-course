import { ReactNode } from "react";
import Sidebar from "../Sidebar";
import SuggestedProducts from "../SuggestedProducts";
import TopMenu from "./TopMenu";

const BaseLayout = async ({
  children,
  renderRightPanel = true,
  renderSidePanel = true,
}: {
  children: ReactNode;
  renderRightPanel?: boolean;
  renderSidePanel?: boolean;
}) => {
  return (
    <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
      <TopMenu />

      <div className="flex max-w-2xl lg:max-w-7xl mx-auto relative">
        {renderSidePanel && renderRightPanel && (
          <>
            <div className="w-1/5">
              <Sidebar />
            </div>
            <div className="w-3/5 flex flex-col border-r">{children}</div>
            <div className="w-1/5">
              <SuggestedProducts />
            </div>
          </>
        )}
        {renderSidePanel && !renderRightPanel && (
          <>
            <div className="w-1/5">
              <Sidebar />
            </div>
            <div className="w-4/5 flex flex-col border-r">{children}</div>
          </>
        )}
        {!renderSidePanel && renderRightPanel && (
          <>
            <div className="w-4/5 flex flex-col border-r">{children}</div>
            <div className="w-1/5">
              <SuggestedProducts />
            </div>
          </>
        )}
        {!renderSidePanel && !renderRightPanel && (
          <div className="w-full flex flex-col">{children}</div>
        )}
      </div>
    </div>
  );
};
export default BaseLayout;
