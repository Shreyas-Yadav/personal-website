const DEFAULT_CATEGORY = 'software';
const DEFAULT_ICON = 'code';

const CATEGORY_BY_TOPIC = {
    software: 'software',
    architecture: 'architecture',
    networking: 'networking',
    ai: 'ai',
    cloud: 'cloud',
    bigdata: 'bigdata'
};

const ICON_BY_CATEGORY = {
    software: 'code',
    architecture: 'cpu',
    networking: 'wifi',
    ai: 'bot',
    cloud: 'cloud',
    bigdata: 'bar-chart'
};

function toTitleCase(value) {
    return value
        .split(/[-_\s]+/)
        .filter(Boolean)
        .map(segment => segment.charAt(0).toUpperCase() + segment.slice(1))
        .join(' ');
}

function slugify(value) {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

function normalizeTopic(topic) {
    return topic
        .split(/[-_]+/)
        .filter(Boolean)
        .map(segment => segment.charAt(0).toUpperCase() + segment.slice(1))
        .join(' ');
}

function deriveCategory({ category, topics = [] }) {
    if (category && CATEGORY_BY_TOPIC[category]) {
        return category;
    }

    const matchedTopic = topics.find(topic => CATEGORY_BY_TOPIC[topic]);
    return matchedTopic ? CATEGORY_BY_TOPIC[matchedTopic] : DEFAULT_CATEGORY;
}

function deriveIcon({ icon, category }) {
    if (icon) {
        return icon;
    }

    return ICON_BY_CATEGORY[category] || DEFAULT_ICON;
}

function deriveTags({ tags, language, topics = [] }) {
    if (Array.isArray(tags) && tags.length > 0) {
        return tags;
    }

    const derived = [];

    if (language) {
        derived.push(language);
    }

    topics
        .filter(topic => topic !== 'portfolio')
        .map(normalizeTopic)
        .forEach(topic => {
            if (!derived.includes(topic)) {
                derived.push(topic);
            }
        });

    return derived.slice(0, 4);
}

function normalizeGithubProject(project, override = {}) {
    const category = deriveCategory({
        category: override.category,
        topics: project.topics
    });

    return {
        id: override.id || slugify(override.repoName || project.repoName),
        repoName: project.repoName,
        repoUrl: project.repoUrl,
        title: override.title || toTitleCase(project.repoName),
        description: override.description || project.description || 'Project imported from GitHub.',
        category,
        icon: deriveIcon({ icon: override.icon, category }),
        tags: deriveTags({
            tags: override.tags,
            language: project.language,
            topics: project.topics
        }),
        domain: override.domain || null,
        topics: project.topics || [],
        language: project.language || null,
        isHidden: Boolean(override.isHidden),
        sortOrder: override.sortOrder ?? 1000,
        source: 'github',
        updatedAt: project.updatedAt || null
    };
}

function normalizeManualProject(project, index) {
    const category = deriveCategory({
        category: project.category,
        topics: project.topics || []
    });

    return {
        id: project.id || slugify(project.title),
        repoName: project.repoName || null,
        repoUrl: project.repoUrl || project.link || null,
        title: project.title,
        description: project.description,
        category,
        icon: deriveIcon({ icon: project.icon, category }),
        tags: deriveTags({
            tags: project.tags,
            language: project.language,
            topics: project.topics || []
        }),
        domain: project.domain || null,
        topics: project.topics || [],
        language: project.language || null,
        isHidden: Boolean(project.isHidden),
        sortOrder: project.sortOrder ?? index,
        source: project.source || 'manual',
        updatedAt: project.updatedAt || null
    };
}

function compareProjects(left, right) {
    if (left.sortOrder !== right.sortOrder) {
        return left.sortOrder - right.sortOrder;
    }

    if (left.source !== right.source) {
        return left.source === 'manual' ? -1 : 1;
    }

    const leftTimestamp = left.updatedAt ? Date.parse(left.updatedAt) : 0;
    const rightTimestamp = right.updatedAt ? Date.parse(right.updatedAt) : 0;

    if (leftTimestamp !== rightTimestamp) {
        return rightTimestamp - leftTimestamp;
    }

    return left.title.localeCompare(right.title);
}

export function buildGalleryProjects({
    githubProjects = [],
    projectOverrides = {},
    manualProjects = []
}) {
    const normalizedManualProjects = manualProjects
        .map((project, index) => normalizeManualProject(project, index))
        .filter(project => !project.isHidden);

    const normalizedGithubProjects = githubProjects
        .map(project => normalizeGithubProject(project, projectOverrides[project.repoName]))
        .filter(project => !project.isHidden);

    return [...normalizedManualProjects, ...normalizedGithubProjects].sort(compareProjects);
}

export function buildProjectOverrideStub(repo, existingProjectsCount = 0) {
    const inferredCategory = deriveCategory({ topics: repo.topics });

    return {
        title: null,
        description: null,
        category: inferredCategory,
        icon: deriveIcon({ category: inferredCategory }),
        tags: [],
        sortOrder: 1000 + existingProjectsCount * 10,
        isHidden: false
    };
}
