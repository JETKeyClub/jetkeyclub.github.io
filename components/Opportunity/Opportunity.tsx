"use client"

import Image from "next/image";
import Link from "next/link";

const WANTED_HEIGHT = 30;

interface OpportunityProps {
    image: string,
    details: string,
    link?: string
}

