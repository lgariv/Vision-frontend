
import LastUpdatedFooter from "@/components/last-updated-footer";
import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import("@/components/map/map"), {
  ssr: false,
});

type Props = {};

const MapPage = (props: Props) => {
  return (
    <main className="w-full h-[calc(100vh_-_64px)] overflow-hidden font-heebo" dir="ltr">
      <DynamicMap />
			<LastUpdatedFooter />
    </main>
  );
};

export default MapPage;
