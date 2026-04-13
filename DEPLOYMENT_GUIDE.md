## Getting Started - Deployment Guide

### Prerequisites
- Node.js 18+ installed
- pnpm, npm, yarn, or bun package manager
- Supabase account (free tier available at supabase.com)
- Groq API account (free at groq.com)
- Vercel account (optional, for hosting)

### Step 1: Clone and Install

```bash
# If not already done
git clone https://github.com/Eswaran321/final-project-of-BER.git
cd final-project-of-BER

# Install dependencies
pnpm install
# or: npm install / yarn install / bun install
```

### Step 2: Set Up Supabase

1. Go to https://supabase.com and sign in
2. Create a new project (free tier)
3. Wait for database to initialize
4. Go to Settings → Database → Connection string
5. Go to Settings → API to get your keys:
   - **NEXT_PUBLIC_SUPABASE_URL**: Project URL (Settings → General → API)
   - **NEXT_PUBLIC_SUPABASE_ANON_KEY**: Anon key (Settings → API → Project API keys)
   - **SUPABASE_SERVICE_ROLE_KEY**: Service role key (Settings → API → Project API keys)

### Step 3: Initialize Database

1. In Supabase console, go to SQL Editor
2. Click "New Query"
3. Copy entire contents of `scripts/01-init-database.sql`
4. Paste and click "Run"
5. Wait for success confirmation

**Verify tables created:**
- Users
- Detection_results
- Search_results
- Analysis_history
- Analytics

### Step 4: Set Up Groq API

1. Go to https://console.groq.com
2. Sign in or create account
3. Go to API keys section
4. Create new API key
5. Copy **GROQ_API_KEY**

### Step 5: Configure Environment Variables

Create `.env.local` in project root:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Groq API Configuration
GROQ_API_KEY=your_groq_api_key_here
```

### Step 6: Run Locally

```bash
pnpm dev
# or: npm run dev / yarn dev / bun dev
```

Open http://localhost:3000 in browser

### Step 7: Test the Application

1. **Test Detection**:
   - Go to "AI Detection" tab
   - Paste some text (e.g., ChatGPT-generated content)
   - Click "Analyze"
   - Should see confidence score and indicators

2. **Test Search**:
   - Go to "Advanced Search" tab
   - Enter a search query
   - View ranked results

3. **Test Analytics**:
   - Go to "Analytics" tab
   - Should see usage statistics
   - 7-day trends chart

### Step 8: Deploy to Vercel (Optional)

#### Using Vercel CLI:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables when prompted
# Then follow the URL to dashboard to add env vars
```

#### Using GitHub (Recommended):

1. Push to GitHub:
```bash
git add .
git commit -m "Deploy AI Content Analyzer"
git push origin main
```

2. Go to vercel.com and sign in
3. Click "Add New → Project"
4. Import your GitHub repository
5. Add environment variables:
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
   - SUPABASE_SERVICE_ROLE_KEY
   - GROQ_API_KEY
6. Click "Deploy"

### Troubleshooting

#### Issue: "GROQ_API_KEY is not set"
**Solution**: 
- Check `.env.local` has correct key
- Restart dev server after adding env vars
- In production, verify Vercel dashboard has env vars set

#### Issue: "Supabase connection failed"
**Solution**:
- Verify URL and keys are correct in `.env.local`
- Check Supabase project is active
- Ensure RLS policies aren't blocking (should already be set)
- Test connection in Supabase SQL editor

#### Issue: "Database tables not found"
**Solution**:
- Re-run the SQL migration script
- Ensure you're connected to correct Supabase project
- Check for errors in Supabase SQL Editor output

#### Issue: "Confidence score always 50"
**Solution**:
- Check Groq API is working (test at console.groq.com)
- Verify GROQ_API_KEY is valid
- Check API rate limits (free tier: 30/min)
- Try with different content

### Performance Optimization

For production use:

1. **Enable Caching**:
   - Results are cached with SWR
   - Adjust cache time in `lib/api.ts` if needed

2. **Database Optimization**:
   - Supabase automatically creates indexes
   - Monitor query performance in Supabase Analytics

3. **API Rate Limiting** (future):
   - Implement with Upstash Redis
   - Prevents abuse and excessive Groq API calls

### Monitoring

**Supabase Monitoring**:
- Dashboard → Reports
- Check API usage, database stats, authentication metrics

**Groq Monitoring**:
- Console → Usage
- Track API calls, tokens, rate limits

**Vercel Monitoring** (if deployed):
- Dashboard → Analytics
- Monitor response times, error rates

### Scaling Considerations

1. **Supabase**: Free tier good for ~100k requests/month
2. **Groq**: Free tier: 30 requests/min limit
3. **Vercel**: Free tier supports 10GB bandwidth/month

For higher volume:
- Upgrade Supabase to Pro ($25/month)
- Upgrade Groq to Pro ($20/month)
- Upgrade Vercel to Pro ($20/month)

### Security Checklist

- [ ] Never commit `.env.local` to Git (already in .gitignore)
- [ ] Rotate API keys monthly
- [ ] Enable Supabase RLS policies (done by default)
- [ ] Monitor for suspicious activity
- [ ] Keep dependencies updated: `pnpm update`
- [ ] Test with real-world content before production
- [ ] Set up error tracking (Sentry recommended)

### Next Steps After Deployment

1. Share feedback and suggestions
2. Monitor usage and performance
3. Add custom detection rules (optional enhancement)
4. Implement user authentication (optional)
5. Set up email notifications (optional)
6. Add more AI tools to detection library
7. Implement batch processing for files
8. Create API documentation for third-party use

### Support & Resources

- **Supabase Docs**: https://supabase.com/docs
- **Groq Docs**: https://console.groq.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Vercel Docs**: https://vercel.com/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Issues**: Check GitHub issues or open new one

### Useful Commands

```bash
# Development
pnpm dev              # Start dev server
pnpm build            # Build for production
pnpm start            # Start production server

# Database
pnpm db:push          # Push schema to Supabase (if using Drizzle)
pnpm db:seed          # Seed database (optional)

# Code Quality
pnpm lint             # Run ESLint
pnpm type-check       # Check TypeScript types

# Deployment
pnpm build && pnpm start   # Local production test
```

---

**Last Updated**: April 2026
**Version**: 1.0.0
**Status**: Production Ready
