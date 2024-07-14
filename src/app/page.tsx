
import AddPost from "@/components/AddPost";
import Feeds from "@/components/Feeds";
import LeftSide from "@/components/LeftSide";
import Posts from "@/components/Posts";
import Rightbar from "@/components/Rightbar";
import Story from "@/components/Story";
import Image from "next/image";

export default function Home() {
  return (
 <div className="px-3 md:px-8 py-4 flex  mt-20 ">
    <div className="hidden md:flex md:w-[30%] lg:w-[20%] overflow-y-scroll  max-h-[calc(100vh-110px)]  noScroll-Bar pr-3 ">
      <LeftSide sectionType="home" />
    </div>
   

    <div className="w-full md:w-[70%] lg:w-[60%]  px-4   flex flex-col gap-5 overflow-y-scroll  max-h-[calc(100vh-110px)]  noScroll-Bar ">
      <Story/>
      <AddPost/>
     < Feeds/>
    </div>
    <div className="hidden lg:flex lg:w-[20%]">
      <Rightbar/>
    </div>
   
 </div>
  );
}
