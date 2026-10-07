import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Home() {
  // return (
  //   <div>
  //     <h1>App Page F</h1>
  //   </div>
  // );
  redirect("/login");
}
