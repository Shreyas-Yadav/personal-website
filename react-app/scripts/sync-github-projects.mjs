import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PORTFOLIO_GITHUB_OWNER, PORTFOLIO_REPO_TOPIC } from '../src/data/portfolioSourceConfig.js';
import { buildProjectOverrideStub } from '../src/data/projectUtils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDirectory = path.resolve(__dirname, '../src/data');
const generatedProjectsPath = path.join(dataDirectory, 'githubProjects.generated.json');
const projectOverridesPath = path.join(dataDirectory, 'projectOverrides.json');

function getArgument(name) {
    const index = process.argv.indexOf(name);
    return index >= 0 ? process.argv[index + 1] : null;
}

function sortObjectKeys(value) {
    return Object.keys(value)
        .sort((left, right) => left.localeCompare(right))
        .reduce((sorted, key) => {
            sorted[key] = value[key];
            return sorted;
        }, {});
}

async function readJson(filePath, fallback) {
    try {
        const content = await readFile(filePath, 'utf8');
        return JSON.parse(content);
    } catch (error) {
        if (error.code === 'ENOENT') {
            return fallback;
        }

        throw error;
    }
}

async function fetchPortfolioRepos({ owner, topic, token }) {
    const repos = [];
    let page = 1;
    const headers = {
        'Accept': 'application/vnd.github+json',
        'User-Agent': 'portfolio-project-sync',
        'X-GitHub-Api-Version': '2022-11-28'
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    while (true) {
        const url = new URL(`https://api.github.com/users/${owner}/repos`);
        url.searchParams.set('type', 'owner');
        url.searchParams.set('sort', 'updated');
        url.searchParams.set('per_page', '100');
        url.searchParams.set('page', String(page));

        const response = await fetch(url, {
            headers
        });

        if (!response.ok) {
            const message = await response.text();
            throw new Error(`GitHub API request failed (${response.status}): ${message}`);
        }

        const pageRepos = await response.json();
        if (pageRepos.length === 0) {
            break;
        }

        pageRepos.forEach(repo => {
            const topics = Array.isArray(repo.topics) ? repo.topics : [];
            if (topics.includes(topic)) {
                repos.push({
                    repoName: repo.name,
                    repoUrl: repo.html_url,
                    description: repo.description || '',
                    topics,
                    language: repo.language || null,
                    updatedAt: repo.updated_at || null
                });
            }
        });

        if (pageRepos.length < 100) {
            break;
        }

        page += 1;
    }

    return repos.sort((left, right) => {
        const leftTimestamp = left.updatedAt ? Date.parse(left.updatedAt) : 0;
        const rightTimestamp = right.updatedAt ? Date.parse(right.updatedAt) : 0;
        return rightTimestamp - leftTimestamp;
    });
}

function createPullRequestBody({ newProjects, topic, owner }) {
    const lines = [
        '# Portfolio project sync',
        '',
        `Synced GitHub repositories for \`${owner}\` tagged with \`${topic}\`.`
    ];

    if (newProjects.length > 0) {
        lines.push('', '## New repos discovered');
        newProjects.forEach(project => {
            lines.push(`- \`${project.repoName}\``);
        });

        lines.push(
            '',
            '## Follow-up metadata',
            '- Review `react-app/src/data/projectOverrides.json` and fill in any custom title, description, tags, or ordering you want.'
        );
    } else {
        lines.push('', 'No new repos were discovered. This PR only refreshes generated project metadata.');
    }

    lines.push('', '## Changed files', '- `react-app/src/data/githubProjects.generated.json`', '- `react-app/src/data/projectOverrides.json`');

    return `${lines.join('\n')}\n`;
}

async function main() {
    const owner = process.env.PORTFOLIO_GITHUB_USERNAME || PORTFOLIO_GITHUB_OWNER;
    const topic = process.env.PORTFOLIO_REPO_TOPIC || PORTFOLIO_REPO_TOPIC;
    const token = process.env.PORTFOLIO_GITHUB_TOKEN || process.env.GITHUB_TOKEN || '';
    const summaryFile = getArgument('--summary-file');
    const bodyFile = getArgument('--body-file');

    const existingGenerated = await readJson(generatedProjectsPath, { projects: [] });
    const existingOverrides = await readJson(projectOverridesPath, { projects: {} });
    const syncedProjects = await fetchPortfolioRepos({ owner, topic, token });

    const existingRepoNames = new Set(existingGenerated.projects.map(project => project.repoName));
    const newProjects = syncedProjects.filter(project => !existingRepoNames.has(project.repoName));

    const nextOverrides = { ...existingOverrides.projects };
    syncedProjects.forEach((project, index) => {
        if (!nextOverrides[project.repoName]) {
            nextOverrides[project.repoName] = buildProjectOverrideStub(project, index);
        }
    });

    const generatedPayload = {
        generatedAt: new Date().toISOString(),
        owner,
        topic,
        projects: syncedProjects
    };

    await writeFile(generatedProjectsPath, `${JSON.stringify(generatedPayload, null, 2)}\n`);
    await writeFile(
        projectOverridesPath,
        `${JSON.stringify({ projects: sortObjectKeys(nextOverrides) }, null, 2)}\n`
    );

    if (summaryFile) {
        const summaryPath = path.resolve(__dirname, '..', summaryFile);
        await mkdir(path.dirname(summaryPath), { recursive: true });
        await writeFile(
            summaryPath,
            `${JSON.stringify({ owner, topic, newProjects, totalProjects: syncedProjects.length }, null, 2)}\n`
        );
    }

    if (bodyFile) {
        const bodyPath = path.resolve(__dirname, '..', bodyFile);
        await mkdir(path.dirname(bodyPath), { recursive: true });
        await writeFile(bodyPath, createPullRequestBody({ newProjects, topic, owner }));
    }

    console.log(`Synced ${syncedProjects.length} portfolio repos for ${owner}. New repos: ${newProjects.length}.`);
}

main().catch(error => {
    console.error(error);
    process.exitCode = 1;
});
