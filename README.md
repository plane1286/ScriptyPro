# Scriptly Pro - AI-Powered Audio Storytelling Platform

A modern, professional-grade platform for creating podcast scripts, audiobooks, and audio dramas with AI-powered writing assistance.

## 🎯 Product Overview

**Scriptly Pro** is an AI-enhanced creative writing platform built for audio content creators. Unlike generic writing tools, it understands the unique demands of audio storytelling—proper character voice profiles, sound effect timing, episode continuity, and production-ready formatting.

### The Problem We Solve
- Podcasters and audiobook authors waste time on formatting and continuity management
- Pre-production planning (characters, relationships, assets) is scattered across multiple tools
- AI writing assistants often ignore creative control and destroy the writer's vision
- Teams need real-time collaboration without losing version history

### Our Mission
Scriptly Pro automates the technical work (formatting, organization, asset generation) so creators can focus on what matters: the story. Every feature is designed to keep the writer in complete creative control.

## 🚀 Key Features

### 1. **Smart Script Editor**
- Hollywood-standard audio script formatting (scene headings, character names, dialogue, parentheticals)
- AI-powered auto-complete suggestions (Cmd/Ctrl + Space)
- Real-time save and version tracking
- Multi-episode management in a single project

### 2. **Character Management**
- Visual character relationship canvas (infinite canvas design)
- Voice profile tracking (narrator types, accents, voice actor notes)
- Character bio generation from script
- Relationship mapping across episodes

### 3. **Episode Organization**
- Story beat/outline mapping
- Scene-level organization
- Duration tracking and pacing analysis
- Episode status management (draft, review, published)

### 4. **Audio Asset Library**
- Track music, sound effects, and ambient audio
- Link audio notes to specific scenes
- Production asset organization
- Timing annotations for sound designers

### 5. **Real-Time Collaboration**
- Multi-user editing with CRDT sync
- Comment system with resolved/open tracking
- Version history and rollback
- Project sharing and permissions

### 6. **AI-Powered Production Suite**
- Generate character bios from script
- Create character relationship graphs
- Produce character portraits and casting references
- Generate sound effect suggestions
- Scene-level storyboarding

## 📱 User Flows

### Flow 1: New Creator Getting Started
1. Sign up → Create first project (select: Podcast/Audiobook/Audio Drama)
2. Create first episode
3. Start writing script with AI auto-complete
4. Invite collaborators (co-writers, directors, producers)
5. Use character management to organize cast
6. Generate production assets
7. Export or publish

### Flow 2: Ongoing Production
1. Open project dashboard
2. Select episode to edit
3. Review comments from collaborators
4. Make revisions with AI suggestions
5. Update character relationships as story evolves
6. Track audio assets per scene
7. Publish episode when ready

### Flow 3: Team Collaboration
1. Project creator invites team members
2. Multiple users edit same script simultaneously
3. Comments appear inline at specific timestamps
4. Version history tracks all changes
5. Producer approves scenes before recording
6. Sound designer pulls audio asset list from app

## 🏗️ Architecture

### Tech Stack
- **Frontend**: Next.js 16 (App Router), React 19, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: JWT with httpOnly cookies
- **Real-time**: CRDT-based collaboration (ready for implementation)

### Database Schema
- **Users**: Account management with hashed passwords
- **Projects**: Podcast/audiobook metadata and status
- **Episodes**: Individual script files with content and status
- **Characters**: Cast members with voice profiles and relationships
- **CharacterRelationships**: Graph of character connections
- **StoryBeats**: Scene outlines and structure
- **AudioAssets**: Music, SFX, and ambient tracks
- **AIGenerations**: Cache of AI-generated suggestions
- **DocumentVersions**: Version history for collaboration
- **Comments**: Feedback with timestamp and resolution tracking

## 🔐 Security

- Passwords hashed with bcrypt (10 rounds)
- JWT authentication with 7-day expiration
- httpOnly cookies prevent XSS attacks
- Row-level authorization on all data
- All API routes verify user ownership before returning data
- Environment variables for secrets

## 🎨 UI/UX Design

### Color Scheme
- Dark mode (slate-900, slate-800) - perfect for late-night writing sessions
- Blue accents (#3b82f6) for interactive elements
- Minimal, focused interface inspired by professional writing tools

### Key Design Principles
- **Distraction-free writing**: Clean, focused editor
- **Progressive disclosure**: Complex features hidden until needed
- **Keyboard shortcuts**: Power users can work fast
- **Visual feedback**: Clear saving status, error messages
- **Responsive**: Works on desktop and tablet

## 📊 Pages & Navigation

### Public Pages
- **/** - Landing page (product overview, mission statement, features CTA)
- **/login** - Sign in with email/password
- **/signup** - Create new account

### Authenticated Pages
- **/dashboard** - Project list with create new project
- **/editor/[projectId]** - Main writing interface with sidebar episode list
- **/projects/[projectId]/characters** - Character management canvas
- **/projects/[projectId]/assets** - Audio asset library
- **/projects/[projectId]/settings** - Project settings and sharing

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create account
- `POST /api/auth/login` - Sign in
- `POST /api/auth/logout` - Sign out
- `GET /api/user` - Get current user

### Projects
- `GET /api/projects` - List user's projects
- `POST /api/projects` - Create new project
- `GET /api/projects/[id]` - Get project details
- `PUT /api/projects/[id]` - Update project
- `DELETE /api/projects/[id]` - Delete project

### Episodes
- `GET /api/episodes?projectId=X` - List project episodes
- `POST /api/episodes` - Create episode
- `GET /api/episodes/[id]` - Get episode
- `PUT /api/episodes/[id]` - Update episode content
- `DELETE /api/episodes/[id]` - Delete episode

### Characters
- `GET /api/characters?projectId=X` - List project characters
- `POST /api/characters` - Create character
- `GET /api/characters/[id]` - Get character
- `PUT /api/characters/[id]` - Update character
- `DELETE /api/characters/[id]` - Delete character

## 🚀 Future Enhancements

### Phase 1 (In Development)
- [ ] AI Script Advisor (multi-agent feedback system)
- [ ] Character relationship graph visualization
- [ ] Story beat/outline management
- [ ] Audio asset linking to scenes

### Phase 2 (Planned)
- [ ] Real-time CRDT-based collaboration
- [ ] AI-powered storyboarding
- [ ] Production asset generation (character portraits, casting posters)
- [ ] Export to PDF, Final Draft, Fountain formats
- [ ] Mobile app (React Native)

### Phase 3 (Roadmap)
- [ ] AI voice generation for script preview
- [ ] Integrated recording studio
- [ ] Production budget tracking
- [ ] Public project library for sharing and remixing
- [ ] Analytics and listener engagement tracking

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### Development
```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Run migrations
npx drizzle-kit push

# Start dev server
npm run dev
```

### Production
```bash
# Build
npm run build

# Start
npm start
```

## 📝 License

Proprietary - Scriptly Pro, Inc.

## 👥 Team

Built with ❤️ for audio creators, by audio creators who understand the craft.

---

**Scriptly Pro**: From first draft to final cut. 🎙️
