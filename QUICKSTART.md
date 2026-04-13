# Quick Start Guide - AI Content Analyzer Pro

## 5-Minute Setup

### Step 1: Prerequisites (2 min)
1. Ensure you have Node.js 18+ installed
2. Create accounts at:
   - [Supabase](https://supabase.com) (free tier available)
   - [Groq](https://groq.com) (free API key)

### Step 2: Clone & Install (1 min)
```bash
cd final-project-of-BER
pnpm install
```

### Step 3: Environment Setup (1 min)
```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
GROQ_API_KEY=gsk_your_key
```

### Step 4: Database Setup (1 min)
1. Go to your Supabase project → SQL Editor
2. Create new query
3. Copy all SQL from `scripts/01-init-database.sql`
4. Execute

### Step 5: Launch (1 min)
```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000)

---

## First-Time Usage

### Try AI Detection
1. Go to **"AI Detection"** tab
2. Copy this sample text:
```
The advancement of artificial intelligence has revolutionized numerous industries. 
Machine learning algorithms can now process vast amounts of data and identify patterns 
that humans might overlook. Natural language processing enables computers to understand 
and generate human language with increasing sophistication.
```
3. Click **"Analyze Content"**
4. View your first analysis result!

### Try Advanced Search
1. Go to **"Advanced Search"** tab
2. Search for: "latest AI developments 2026"
3. Browse the ranked results
4. Check accuracy scores

### Check Analytics
1. Go to **"Analytics"** tab
2. View your usage statistics
3. Check 7-day trends
4. See your performance metrics

---

## Troubleshooting First Setup

### Error: "No package.json found"
**Solution**: Ensure you're in the project root directory
```bash
cd final-project-of-BER
ls package.json  # Should show the file
```

### Error: "GROQ_API_KEY is not set"
**Solution**: 
1. Check `.env.local` exists
2. Verify Groq API key is correct
3. Restart dev server after changing env vars

### Error: "Cannot connect to Supabase"
**Solution**:
1. Verify Supabase URL in `.env.local`
2. Check anon key is correct
3. Ensure database tables exist
4. Check RLS policies aren't blocking access

### Error: "Module not found"
**Solution**: Reinstall dependencies
```bash
rm -rf node_modules
pnpm install
```

---

## Common Operations

### Add a New Environment Variable
1. Update `.env.local`
2. Restart dev server with `Ctrl+C` then `pnpm dev`

### View Database Records
1. Go to Supabase project
2. Click "Table Editor"
3. Browse tables: detection_results, search_results, etc.

### Check API Requests
1. Open browser DevTools (F12)
2. Go to Network tab
3. Perform an action (detect/search)
4. View the API calls

### Reset User Data
1. Click "Reset" button in top-right
2. This clears your local user ID
3. Generates new session

---

## Production Deployment

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy with Docker
```bash
docker build -t ai-analyzer .
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_SUPABASE_URL=... \
  -e NEXT_PUBLIC_SUPABASE_ANON_KEY=... \
  -e SUPABASE_SERVICE_ROLE_KEY=... \
  -e GROQ_API_KEY=... \
  ai-analyzer
```

---

## Next Steps

1. **Customize Settings**: Update colors in `tailwind.config.ts`
2. **Add User Auth**: Implement Supabase Auth
3. **Deploy**: Use Vercel or Docker
4. **Monitor**: Set up error tracking
5. **Scale**: Add caching and rate limiting

---

## Need Help?

- 📖 [Full Documentation](./README.md)
- 🎯 [Features Guide](./FEATURES.md)
- 🔧 [Development Guide](./DEVELOPMENT.md)
- 🐛 [Troubleshooting](./README.md#troubleshooting)

---

**Welcome to AI Content Analyzer Pro!** 🚀
