import dynamic from "next/dynamic";

const Diagram = dynamic(() => import("./Scheme"), { ssr: false });
export default Diagram