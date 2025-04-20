# GitHub Workflow for IT Company CMS

## Repository Structure

### Main Branches
- `main`: Production-ready code
- `develop`: Integration branch for feature development
- `staging`: Pre-production testing environment

### Feature Branching Strategy
- Branch naming convention: `feature/CMS-[issue-number]-[brief-description]`
- Example: `feature/CMS-42-rich-text-editor`

### Bug Fix Branches
- Branch naming convention: `bugfix/CMS-[issue-number]-[brief-description]`
- Example: `bugfix/CMS-57-auth-token-expiry`

### Release Branches
- Branch naming convention: `release/v[major].[minor].[patch]`
- Example: `release/v1.2.0`

## Pull Request Process

### PR Template
```markdown
## Description
[Brief description of changes]

## Related Issue
Fixes CMS-[issue-number]

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## How Has This Been Tested?
[Description of testing process]

## Checklist
- [ ] My code follows the project's style guidelines
- [ ] I have performed a self-review of my code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
```

### Review Requirements
- Minimum of 1 reviewer approval required
- All CI checks must pass
- No merge conflicts

## CI/CD Pipeline

### GitHub Actions Workflow
- Lint check on all PRs
- Unit tests on all PRs
- Integration tests on merges to develop
- Deployment to staging on merges to staging
- Deployment to production on merges to main

### Automated Checks
- TypeScript type checking
- ESLint code style validation
- Test coverage requirements (minimum 70%)
- Build verification

## Issue Linking

### Commit Message Format
- Format: `[CMS-issue-number] Brief description of changes`
- Example: `[CMS-42] Implement rich text editor component`

### Automated Issue Updates
- PR creation: Move issue to "In Review"
- PR merge: Move issue to "Done"
- PR close/reject: Move issue back to "To Do"