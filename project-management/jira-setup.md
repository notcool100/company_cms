# JIRA Project Setup for IT Company CMS

## Project Structure

### Project Key: CMS

### Issue Types
- Epic
- Story
- Task
- Bug
- Documentation

### Custom Fields
- Priority (High, Medium, Low)
- Estimated Hours
- Actual Hours
- Dependencies
- Technical Requirements

### Workflow States
1. **To Do**: Task is created but not started
2. **In Progress**: Work has begun on the task
3. **In Review**: Code review or testing in progress
4. **Done**: Task is completed and verified

### Epics
1. Authentication & User Management
2. Content Management Enhancements
3. Analytics & SEO
4. Performance & Deployment
5. Testing & Documentation

### Sprints
- Two-week sprint cycles
- Sprint planning every other Monday
- Sprint review and retrospective every other Friday

## Dashboard Configuration

### Main Dashboard Widgets
- Sprint burndown chart
- Velocity chart
- Cumulative flow diagram
- Issue status distribution
- Assigned issues by team member

### Custom Reports
- Weekly progress report
- Risk assessment tracker
- Dependency visualization
- Time tracking summary

## Integration Setup

### GitHub Integration
- Link commits to JIRA issues using issue keys in commit messages
- Automated status updates based on PR status
- Branch creation from JIRA issues

### Slack Integration
- Daily digest of issue updates
- Notifications for blocked issues
- Sprint start/end announcements

## Access Control

### User Roles
- Project Admin: Project Manager
- Developers: Full edit access to assigned issues
- Stakeholders: View-only access with comment privileges