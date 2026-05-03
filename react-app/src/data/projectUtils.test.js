import test from 'node:test';
import assert from 'node:assert/strict';
import { buildGalleryProjects, buildProjectOverrideStub } from './projectUtils.js';

test('buildGalleryProjects merges github projects with overrides', () => {
    const projects = buildGalleryProjects({
        githubProjects: [
            {
                repoName: 'cool-ai-tool',
                repoUrl: 'https://github.com/example/cool-ai-tool',
                description: 'GitHub description',
                topics: ['portfolio', 'ai'],
                language: 'Python',
                updatedAt: '2026-04-03T10:00:00Z'
            }
        ],
        projectOverrides: {
            'cool-ai-tool': {
                title: 'Cool AI Tool',
                description: 'Custom portfolio summary',
                tags: ['Python', 'LLM'],
                icon: 'bot',
                category: 'ai',
                sortOrder: 5
            }
        }
    });

    assert.equal(projects.length, 1);
    assert.equal(projects[0].title, 'Cool AI Tool');
    assert.equal(projects[0].description, 'Custom portfolio summary');
    assert.deepEqual(projects[0].tags, ['Python', 'LLM']);
    assert.equal(projects[0].category, 'ai');
});

test('buildGalleryProjects falls back to GitHub metadata', () => {
    const projects = buildGalleryProjects({
        githubProjects: [
            {
                repoName: 'systems-lab',
                repoUrl: 'https://github.com/example/systems-lab',
                description: '',
                topics: ['portfolio', 'networking'],
                language: 'Go',
                updatedAt: '2026-04-03T10:00:00Z'
            }
        ]
    });

    assert.equal(projects[0].title, 'Systems Lab');
    assert.equal(projects[0].description, 'Project imported from GitHub.');
    assert.equal(projects[0].category, 'networking');
    assert.deepEqual(projects[0].tags, ['Go', 'Networking']);
});

test('buildGalleryProjects excludes hidden projects', () => {
    const projects = buildGalleryProjects({
        githubProjects: [
            {
                repoName: 'hidden-project',
                repoUrl: 'https://github.com/example/hidden-project',
                description: 'Hidden',
                topics: ['portfolio'],
                language: 'JavaScript',
                updatedAt: '2026-04-03T10:00:00Z'
            }
        ],
        projectOverrides: {
            'hidden-project': {
                isHidden: true
            }
        }
    });

    assert.equal(projects.length, 0);
});

test('manual projects sort ahead of github projects with same sort order', () => {
    const projects = buildGalleryProjects({
        manualProjects: [
            {
                id: 'manual-project',
                title: 'Manual Project',
                description: 'Manual',
                category: 'software',
                tags: ['React']
            }
        ],
        githubProjects: [
            {
                repoName: 'github-project',
                repoUrl: 'https://github.com/example/github-project',
                description: 'GitHub',
                topics: ['portfolio'],
                language: 'TypeScript',
                updatedAt: '2026-04-03T10:00:00Z'
            }
        ]
    });

    assert.equal(projects[0].source, 'manual');
    assert.equal(projects[1].source, 'github');
});

test('buildProjectOverrideStub creates editable defaults', () => {
    const stub = buildProjectOverrideStub(
        {
            repoName: 'cloud-worker',
            topics: ['portfolio', 'cloud']
        },
        2
    );

    assert.equal(stub.title, null);
    assert.equal(stub.category, 'cloud');
    assert.equal(stub.icon, 'cloud');
    assert.equal(stub.sortOrder, 1020);
});
