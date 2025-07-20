"use client";
import { useEffect, useState } from "react";
import { getJobs } from "@/actions/jobs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function JobsPage() {
    const jobsPerPage = 10;
    const [jobs, setJobs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        async function fetchJobs() {
            const data = await getJobs();
            setJobs(data);
            setLoading(false);
        }
        fetchJobs();
    }, []);

    const pages = Math.ceil(jobs.length / jobsPerPage);
    const jobsToShow = jobs.slice((currentPage - 1) * jobsPerPage, currentPage * jobsPerPage);

    const getDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    if (loading) {
        return (
            <div className="text-center mt-10">
                <h1 className="text-4xl font-bold gradient-title">Loading Jobs...</h1>
            </div>
        );
    }
    if (jobs.length === 0) {
        return (
            <div className="text-center mt-10">
                <h1 className="text-4xl font-bold gradient-title">No Job Postings Available</h1>
                <p className="mt-4 text-gray-600">Please check back later.</p>
            </div>
        );
    }
    return (
        <div>
            <h1 className="text-6xl font-bold gradient-title">Job Postings</h1>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobsToShow.map((job) => (
                    <div key={job.id} className="border p-4 rounded-lg">
                        <h2 className="text-xl font-semibold">{job.title}</h2>
                        <p className="text-gray-600">{job.company}</p>
                        <p className="text-gray-500">{job.location}</p>
                        <p className="text-gray-500">{getDate(job.publishedAt)}</p>
                        <Link href={job.url} className="text-blue-500 hover:underline mt-4 inline-block" target="_blank" rel="noopener noreferrer">
                            View Details
                        </Link>
                    </div>
                ))}
            </div>
            <div className="mt-8 text-center">
                <p className="text-gray-600">Page {currentPage} of {pages}</p>
                <div className="flex justify-center space-x-4 mt-4">
                    <Button
                        variant='outline'
                        className={`text-blue-500 hover:underline ${currentPage === 1 ? 'disabled cursor-not-allowed' : 'cursor-pointer'}`}
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    >
                        Prev Page
                    </Button>
                    <Button
                        variant='outline'
                        className={`text-blue-500 hover:underline ${currentPage === pages ? 'disabled cursor-not-allowed' : 'cursor-pointer'}`}
                        disabled={currentPage === pages}
                        onClick={() => setCurrentPage((p) => Math.min(pages, p + 1))}
                    >
                        Next Page
                    </Button>
                </div>
            </div>
        </div>
    );
}
