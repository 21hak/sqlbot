import dynamic from "next/dynamic";

const Diagram = dynamic(() => import("./components/Scheme/Scheme"), { ssr: false });
export default Diagram