import generatedGithubProjects from './githubProjects.generated.json';
import projectOverridesData from './projectOverrides.json';
import { buildGalleryProjects } from './projectUtils';

export const featuredProjects = [
    {
        id: 'threat-radar',
        number: '01',
        label: 'Security Engineering',
        title: 'Threat Radar',
        description: 'CLI container security scanner that analyzes Docker images for vulnerabilities, misconfigurations, and supply chain risks. Contributed 90+ high-severity fixes to Google Open Source.',
        tech: ['Python', 'NetworkX', 'Docker', 'CVE Analysis'],
        award: {
            icon: 'star',
            text: "Master's Capstone Project"
        },
        repoUrl: 'https://github.com/Threat-Radar/tr.git',
        visual: {
            type: 'terminal',
            lines: [
                { text: '$ threat-radar scan nginx:latest', delay: 0, prefix: 'green' },
                { text: 'Analyzing image layers...', delay: 400, color: 'dim' },
                { text: 'Building dependency graph... ', delay: 800, color: 'dim', suffix: { text: '247 packages', color: 'blue' } },
                { text: '⚠ 3 HIGH', delay: 1200, color: 'orange', suffix: { text: ' | 12 MEDIUM | 8 LOW', color: 'dim' } },
                { text: '✓ Report: ', delay: 1600, prefix: 'green', suffix: { text: './threat-report.json', color: 'blue' } }
            ]
        }
    },
    {
        id: 'live-caster',
        number: '02',
        label: 'Featured Project',
        title: 'Live-Caster',
        description: 'Real-time AI commentary system for live events. Gemini 2.5 Flash processes video streams while ElevenLabs delivers natural voice synthesis with sub-second latency.',
        tech: ['Gemini 2.5 Flash', 'ElevenLabs', 'WebSockets', 'Python'],
        award: {
            icon: 'star',
            text: '3rd Place — Google DeepMind × Cerebral Valley'
        },
        repoUrl: 'https://github.com/Shreyas-Yadav/Live-Caster.git',
        visual: {
            type: 'parallax',
            icon: '🎙️'
        }
    }
];

export const categories = [
    { id: 'all', label: 'All' },
    { id: 'distributed', label: 'Distributed' },
    { id: 'cloud', label: 'Cloud' },
    { id: 'ai', label: 'AI' },
    { id: 'software', label: 'Software' },
];

const manualProjects = [
    {
        id: 'mapreduce-engine',
        icon: 'cpu',
        title: 'Distributed MapReduce Engine',
        description: 'Built a distributed MapReduce engine in Go on top of a custom DFS, orchestrating map and reduce tasks across a 12-node HPC cluster with plugin-based job binaries and configurable reducer counts. Implemented full shuffle pipeline using FNV-32a hash partitioning and k-way min-heap merge following the Google MapReduce design.',
        tags: ['Go', 'Protocol Buffers', 'Distributed Systems', 'DFS'],
        category: 'distributed',
        domain: 'Distributed Systems',
        repoUrl: 'https://github.com/usf-cs677-sp26/p2-mapreduce'
    },
    {
        id: 'magnet-arena',
        icon: 'cloud',
        title: 'Magnet Arena',
        description: 'Cloud-native game with production AWS infrastructure (EKS, RDS, VPC) provisioned exclusively via Terraform IaC. Engineered a 4-stage Git-driven CI/CD pipeline with zero-downtime Blue/Green deployments on Kubernetes. Self-hosted Prometheus + Grafana observability stack with OAuth2-secured access and Loki log aggregation.',
        tags: ['AWS EKS', 'Terraform', 'Kubernetes', 'CI/CD'],
        category: 'cloud',
        domain: 'DevOps'
    },
    {
        id: 'clipstudy',
        icon: 'video',
        title: 'ClipStudy',
        description: 'AI-powered video learning platform with a serverless FastAPI backend on AWS Lambda. Designed an async job queue using SQS + EC2 worker polling for GPU-accelerated transcription and LLM-generated flashcards, maintaining sub-second API response times for 10+ concurrent users.',
        tags: ['FastAPI', 'AWS Lambda', 'SQS', 'React'],
        category: 'ai cloud',
        domain: 'AI / Cloud'
    },
    {
        id: 'easyshare',
        icon: 'users',
        title: 'EasyShare',
        description: 'AI-powered bill splitting and file sharing app. Engineered an AI receipt analysis pipeline using OpenAI vision API with Zod schema validation and price normalization. Built real-time collaboration with Socket.IO, Redis-backed rooms, and Clerk auth for concurrent file sharing and bill management.',
        tags: ['Next.js', 'WebSockets', 'Redis', 'OpenAI'],
        category: 'ai software',
        domain: 'Full Stack',
        repoUrl: 'https://github.com/Shreyas-Yadav/easy-share'
    },
];

export const githubProjectSource = {
    generatedAt: generatedGithubProjects.generatedAt,
    owner: generatedGithubProjects.owner,
    topic: generatedGithubProjects.topic
};

export const galleryProjects = buildGalleryProjects({
    githubProjects: generatedGithubProjects.projects,
    projectOverrides: projectOverridesData.projects,
    manualProjects
});
