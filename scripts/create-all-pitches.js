const { execSync } = require('child_process');

function getGitHubToken() {
  const creds = execSync('git credential fill', {
    input: 'protocol=https\nhost=github.com\n'
  }).toString();
  const match = creds.match(/password=(.+)/);
  if (!match) throw new Error('Could not find GitHub token in git credential manager');
  return match[1].trim();
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  const token = getGitHubToken();
  const results = [];

  for (let i = 2; i <= 10; i++) {
    const num = String(i).padStart(2, '0');
    const repoName = `dental-pitch-${num}`;
    const remoteName = `pitch-${num}`;

    console.log(`\n========================================`);
    console.log(`[${i}/10] Processing ${repoName}...`);
    console.log(`========================================`);

    // 1. Check if repo exists
    const checkRes = await fetch(`https://api.github.com/repos/atharvpande07/${repoName}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'User-Agent': 'Pitch-Manager',
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    if (checkRes.status === 404) {
      console.log(`Creating repository: ${repoName}...`);
      const createRes = await fetch('https://api.github.com/user/repos', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'User-Agent': 'Pitch-Manager',
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: repoName,
          description: `Precision Dental Studio Platform Pitch ${num}`,
          private: false,
          has_issues: true,
          has_projects: false,
          has_wiki: false
        })
      });

      if (!createRes.ok) {
        const err = await createRes.text();
        console.error(`Failed to create ${repoName}:`, err);
        continue;
      }
      console.log(`Created ${repoName} successfully!`);
    } else {
      console.log(`${repoName} already exists on GitHub.`);
    }

    // Wait a brief moment for GitHub backend consistency
    await sleep(1500);

    // 2. Enable GitHub Pages for workflow deployment
    console.log(`Enabling GitHub Pages for ${repoName}...`);
    try {
      const pagesRes = await fetch(`https://api.github.com/repos/atharvpande07/${repoName}/pages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'User-Agent': 'Pitch-Manager',
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          build_type: 'workflow'
        })
      });
      console.log(`Pages status: ${pagesRes.status}`);
    } catch (err) {
      console.log('Pages config note:', err.message);
    }

    // 3. Add git remote if missing
    console.log(`Configuring git remote: ${remoteName}...`);
    try {
      execSync(`git remote remove ${remoteName}`, { stdio: 'ignore' });
    } catch {}
    execSync(`git remote add ${remoteName} https://github.com/atharvpande07/${repoName}.git`);

    // 4. Push main branch
    console.log(`Pushing code to ${remoteName}...`);
    try {
      execSync(`git push -u ${remoteName} main`, { stdio: 'inherit' });
      console.log(`Successfully pushed main to ${repoName}!`);
      results.push({
        num,
        repo: repoName,
        url: `https://atharvpande07.github.io/${repoName}/`,
        github: `https://github.com/atharvpande07/${repoName}`
      });
    } catch (pushErr) {
      console.error(`Push failed for ${repoName}:`, pushErr.message);
    }

    // Small rate-limit delay
    await sleep(2000);
  }

  console.log('\n\n========================================');
  console.log('ALL 10 PITCH REPOSITORIES INITIALIZED!');
  console.log('========================================');
  console.table(results);
}

main().catch(console.error);
