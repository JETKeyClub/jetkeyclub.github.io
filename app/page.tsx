"use client"

import Opportunity from "@/components/Opportunity/Opportunity";
import Image from "next/image";
import * as nav from "next/navigation";


export default function base() {
  nav.useRouter().push("/Home")
  return (
    <></>
  );
}
