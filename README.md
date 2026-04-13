# AI Content Analyzer Pro

An advanced Next.js application for AI-powered content detection, intelligent searching, and comprehensive analytics. Features real-time confidence scoring, multi-source search capabilities, and floating social media integration.

## Features

### 🔍 AI Content Detection
- **Real-time Analysis**: Detect AI-generated content with confidence scoring
- **Advanced Indicators**: Get detailed analysis with key indicators and explanations
- **Groq AI Integration**: Powered by Groq's fast and accurate AI models
- **Detection History**: Track all your detections with Supabase
- **Confidence Visualization**: Real-time confidence progress bars and metrics

### 🌐 Advanced Search Engine
- **AI-Powered Results**: Get relevant search results ranked by AI
- **Accuracy Scoring**: Each result includes relevance and accuracy metrics
- **Multi-Source Search**: Results from various sources (articles, videos, research, news)
- **Search History**: Access all your previous searches
- **Relevance Ranking**: Visual ranking indicators for all results

### 📊 Analytics Dashboard
- **Real-time Statistics**: View detection and search counts
- **Trend Analysis**: 7-day activity trends with visual charts
- **Performance Metrics**: Average confidence and accuracy scores
- **Usage Distribution**: Understand your platform usage patterns
- **Insights**: AI-generated insights about your usage

### 🎯 Floating Widget
- **Social Media Integration**: Share results to Twitter, Facebook, LinkedIn, and Email
- **Always Available**: Persistent floating widget in the corner
- **Quick Access**: One-click sharing from anywhere in the app

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **AI/LLM**: Groq API with Mixtral 8x7B
- **Charting**: Recharts
- **UI Icons**: Lucide React
- **Data Fetching**: SWR (client-side)

## Environment Setup

### Prerequisites
- Node.js 18+ and npm/pnpm
- Supabase account and project
- Groq API key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd final-project-of-BER
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure your `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
GROQ_API_KEY=your_groq_api_key
```

5. Initialize the database:
- Go to your Supabase project
- Open SQL Editor
- Copy and paste the contents of `scripts/01-init-database.sql`
- Execute the SQL

6. Start the development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── detect/          # AI detection endpoint
│   │   ├── search/          # Advanced search endpoint
│   │   └── analytics/       # Analytics data endpoint
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   └── globals.css          # Global styles
├── components/
│   ├── detection-panel.tsx  # Detection UI
│   ├── detection-results.tsx
│   ├── search-panel.tsx     # Search UI
│   ├── search-results.tsx
│   ├── analytics-dashboard.tsx
│   ├── header.tsx
│   ├── navigation.tsx
│   └── floating-widget.tsx
├── lib/
│   └── supabase.ts          # Database utilities
├── scripts/
│   └── 01-init-database.sql # Database schema
└── package.json
```

## API Endpoints

### Detection API
**POST** `/api/detect`
- Analyzes content for AI generation
- Request: `{ content: string, userId: string }`
- Response: Detection result with confidence score

**GET** `/api/detect?userId=<userId>`
- Retrieves detection history
- Returns: Array of detection results

### Search API
**POST** `/api/search`
- Performs AI-powered search
- Request: `{ query: string, userId: string }`
- Response: Array of search results with accuracy

**GET** `/api/search?userId=<userId>`
- Retrieves search history
- Returns: Array of search results

### Analytics API
**GET** `/api/analytics?userId=<userId>&period=7d`
- Fetches analytics data
- Returns: Statistics and trend data

## Database Schema

### Tables
- **users**: User profiles and settings
- **detection_results**: AI detection analyses
- **search_results**: Search queries and results
- **analysis_history**: Detailed analysis records
- **analytics**: Aggregated metrics

All tables include Row Level Security (RLS) policies for data protection.

## Performance Optimizations

- **Streaming**: Real-time updates with streaming API responses
- **Caching**: SWR for client-side data caching
- **Database Indexes**: Optimized queries on frequently accessed columns
- **Code Splitting**: Dynamic imports for components
- **Lazy Loading**: Components load on demand

## Security Features

- **Row Level Security**: Supabase RLS policies protect user data
- **API Authentication**: Server-side validation on all endpoints
- **Type Safety**: Full TypeScript coverage
- **Input Validation**: Server-side request validation
- **HTTPS Ready**: Production-ready security headers

## Usage Guide

### Detection Workflow
1. Navigate to "AI Detection" tab
2. Paste or type content
3. Click "Analyze Content"
4. View results with confidence score and indicators
5. Access detection history in analytics

### Search Workflow
1. Navigate to "Advanced Search" tab
2. Enter your search query
3. View ranked results with relevance scores
4. Click external link to visit sources
5. Track search accuracy in analytics

### Analytics Workflow
1. Navigate to "Analytics" tab
2. View real-time statistics
3. Check 7-day trends
4. Monitor performance metrics
5. Export data if needed

### Social Sharing
1. Click the floating widget (bottom-right)
2. Select a platform (Twitter, Facebook, LinkedIn, Email)
3. Share your findings

## Deployment

### Vercel Deployment
```bash
vercel deploy
```

### Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -am 'Add feature'`
3. Push to branch: `git push origin feature/your-feature`
4. Submit a pull request

## Troubleshooting

### API Connection Issues
- Verify Supabase credentials in `.env.local`
- Check if Supabase project is active
- Ensure RLS policies are not blocking queries

### Groq API Errors
- Confirm API key is valid
- Check request quota limits
- Verify API key has proper permissions

### Database Errors
- Ensure database tables exist
- Check RLS policies
- Verify user IDs match across tables

## Future Enhancements

- [ ] Multi-language support
- [ ] Advanced batch processing
- [ ] Custom detection models
- [ ] API rate limiting
- [ ] Team collaboration features
- [ ] Export to PDF/CSV
- [ ] Mobile app
- [ ] Real-time notifications

## License

MIT

## Support

For issues and questions:
1. Check the troubleshooting section
2. Review environment setup
3. Check Supabase and Groq documentation
4. Open an issue on GitHub

## Changelog

### v1.0.0 (Initial Release)
- AI content detection with Groq
- Advanced search engine
- Analytics dashboard
- Floating social widget
- Database integration with Supabase
- Real-time confidence scoring
