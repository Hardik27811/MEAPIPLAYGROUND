# Database Schema

## Collection: Profile

Fields:
- name: String
- email: String
- education: String
- skills: [String]
- projects: [{ title, description, links }]
- work: [String]
- links: { github, linkedin, portfolio }

Indexes:
- skills
- projects.title
