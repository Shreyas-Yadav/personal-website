export const featuredProjects = [
    {
        id: 'live-caster',
        number: '01',
        label: 'Featured Project',
        title: 'Live-Caster',
        description: 'Real-time AI commentary system for live events. Gemini 2.5 Flash processes video streams while ElevenLabs delivers natural voice synthesis with sub-second latency.',
        tech: ['Gemini 2.5 Flash', 'ElevenLabs', 'WebSockets', 'Python'],
        award: {
            icon: 'star',
            text: '3rd Place — Google DeepMind × Cerebral Valley'
        },
        visual: {
            type: 'parallax',
            icon: '🎙️'
        }
    },
    {
        id: 'threat-radar',
        number: '02',
        label: 'Security Engineering',
        title: 'Threat Radar',
        description: 'CLI container security scanner that analyzes Docker images for vulnerabilities, misconfigurations, and supply chain risks. Contributed 90+ high-severity fixes to Google Open Source.',
        tech: ['Python', 'NetworkX', 'Docker', 'CVE Analysis'],
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
    }
];

export const galleryProjects = [
    {
        id: 'social-network',
        icon: '👥',
        title: 'Social Network Desktop App',
        description: 'Desktop application simulating a social network with interactive GUI. Implements Observer and Factory Method design patterns for real-time notifications.',
        tags: ['Java', 'Swing', 'Design Patterns'],
        category: 'software',
        link: '#'
    },
    {
        id: 'hotel-reviews',
        icon: '🏨',
        title: 'Hotel Reviews System',
        description: 'Full-stack web application for hotel review management with secure authentication, MapBox integration, and RESTful APIs.',
        tags: ['Java 17', 'MySQL', 'REST API'],
        category: 'software',
        link: '#'
    },
    {
        id: 'risc-v-single',
        icon: '💾',
        title: 'Single-Cycle RISC-V Processor',
        description: 'Complete single-cycle RISC-V processor implementation with ALU operations, memory access, and comprehensive instruction decoder.',
        tags: ['RISC-V', 'Digital Logic', 'Assembly'],
        category: 'architecture',
        link: '#'
    },
    {
        id: 'risc-v-pipeline',
        icon: '⚡',
        title: 'Pipelined RISC-V Processor',
        description: 'Advanced 5-stage pipelined processor with hazard detection and forwarding units. Optimizes instruction throughput with hazard resolution.',
        tags: ['RISC-V', 'Pipeline', 'Hazard Unit'],
        category: 'architecture',
        link: '#'
    },
    {
        id: 'agent-bench',
        icon: '🤖',
        title: 'AgentBench Framework',
        description: 'Evaluation framework for AI agents using LlamaIndex and Arize Phoenix. Automated assessment of reasoning, tool selection, and execution efficiency.',
        tags: ['LlamaIndex', 'Python', 'GPT-4o'],
        category: 'ai',
        link: '#'
    },
    {
        id: 'code-rag',
        icon: '🧠',
        title: 'Code RAG Assistant',
        description: 'Advanced RAG system for codebases using ChromaDB and Voyage AI embeddings. Features AST-based code chunking and semantic retrieval.',
        tags: ['LlamaIndex', 'Voyage AI', 'Tree-sitter'],
        category: 'ai',
        link: '#'
    },
    {
        id: 'golog-analyzer',
        icon: '📈',
        title: 'GoLog Analyzer',
        description: 'High-performance log analysis tool optimized for processing large-scale web server logs. Built with Go for parallel processing efficiency.',
        tags: ['Go', 'Concurrency', 'Data Pipelines'],
        category: 'bigdata',
        link: '#'
    },
    {
        id: 'weather-app',
        icon: '🌤️',
        title: 'Microservices Weather App',
        description: 'Containerized weather application with Node.js backend and Nginx frontend, deployed on AWS using Docker for scalability.',
        tags: ['AWS', 'Docker', 'Node.js'],
        category: 'cloud',
        link: '#'
    },
    {
        id: 'video-analyzer',
        icon: '📺',
        title: 'Serverless Video Analyzer',
        description: 'Cloud-native architecture for AI video analysis with AWS Lambda, SQS event processing, and Whisper AI transcription.',
        tags: ['AWS Lambda', 'FastAPI', 'Whisper AI'],
        category: 'cloud ai',
        link: '#'
    },
    {
        id: 'compression-detector',
        icon: '📊',
        title: 'Link Compression Detector',
        description: 'Client-server tool for detecting network link compression by analyzing packet train inter-arrival times with entropy analysis.',
        tags: ['C', 'Sockets', 'UDP/TCP'],
        category: 'networking',
        link: '#'
    },
    {
        id: 'ns3-simulation',
        icon: '📡',
        title: 'NS-3 QoS Simulation',
        description: 'Network simulation implementing SPQ and DRR scheduling algorithms with traffic classification and PCAP analysis.',
        tags: ['C++', 'NS-3', 'Network Sim'],
        category: 'networking',
        link: '#'
    }
];

export const categories = [
    { id: 'all', label: 'All' },
    { id: 'software', label: 'Software Dev' },
    { id: 'architecture', label: 'Computer Arch' },
    { id: 'networking', label: 'Networking' },
    { id: 'ai', label: 'Generative AI' },
    { id: 'cloud', label: 'Cloud' },
    { id: 'bigdata', label: 'Big Data' }
];
