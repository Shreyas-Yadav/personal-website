export const skills = [
    // Languages
    { name: 'Python',       color: ['#3776AB', '#FFD43B'] },
    { name: 'Go',           color: '#00ADD8' },
    { name: 'Java',         color: ['#007396', '#ED8B00'] },
    { name: 'JavaScript',   color: '#F7DF1E' },
    { name: 'C',            color: '#A8B9CC' },
    { name: 'C++',          color: '#00599C' },
    // Frameworks
    { name: 'Spring Boot',  color: '#6DB33F' },
    { name: 'FastAPI',      color: '#009688' },
    { name: 'Node.js',      color: '#5FA04E' },
    { name: 'React',        color: '#61DAFB' },
    { name: 'Next.js',      color: '#FFFFFF' },
    { name: 'Express',      color: '#EEEEEE' },
    // Databases
    { name: 'PostgreSQL',   color: '#4169E1' },
    { name: 'MongoDB',      color: ['#47A248', '#001E2B'] },
    { name: 'Redis',        color: '#FF4438' },
    { name: 'MySQL',        color: ['#4479A1', '#F29111'] },
    // Cloud & DevOps
    { name: 'AWS',          color: ['#FF9900', '#232F3E'] },
    { name: 'Docker',       color: '#2496ED' },
    { name: 'Kubernetes',   color: '#326CE5' },
    { name: 'Terraform',    color: '#844FBA' },
    { name: 'ArgoCD',       color: '#EF7B4D' },
    // Tools
    { name: 'Linux',        color: ['#FCC624', '#FFFFFF', '#000000'] },
    { name: 'Prometheus',   color: '#E6522C' },
    { name: 'Grafana',      color: '#F46800' },
    // AI/ML
    { name: 'Claude',       color: '#D97757' },
    { name: 'ChromaDB',     color: '#8B5CF6' },
];

export const stats = [
    {
        id: 'gpa',
        value: 3.83,
        decimals: 2,
        label: 'Graduate GPA',
        suffix: '',
        color: 'default'
    },
    {
        id: 'oss-fixes',
        value: 90,
        decimals: 0,
        label: 'OSS Security Fixes',
        suffix: '+',
        color: 'green'
    },
    {
        id: 'hackathon',
        value: null,
        displayText: '3rd',
        label: 'DeepMind Hackathon',
        color: 'purple'
    },
    {
        id: 'github-projects',
        value: 40,
        decimals: 0,
        label: 'GitHub Projects',
        suffix: '+',
        color: 'orange'
    }
];
