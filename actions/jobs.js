"use server";

import { db } from "@/lib/prisma";

export async function getJobs() {
    try {
        const jobs = await db.job.findMany({
            orderBy: {
                publishedAt: "desc",
            },
        });
        return jobs;

    } catch (error) {
        console.error("Error fetching jobs:", error);
        throw new Error("Failed to fetch jobs");
    }
}