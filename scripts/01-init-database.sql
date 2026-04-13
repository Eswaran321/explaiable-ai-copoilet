-- AI Content Analyzer Database Schema
-- This script creates all necessary tables for the advanced AI platform

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT auth.uid(),
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  preferences JSONB DEFAULT '{}'::jsonb
);

-- Detection results table
CREATE TABLE IF NOT EXISTS detection_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  content_type VARCHAR(50) DEFAULT 'text',
  ai_score DECIMAL(5, 2) NOT NULL CHECK (ai_score >= 0 AND ai_score <= 100),
  confidence DECIMAL(5, 2) NOT NULL CHECK (confidence >= 0 AND confidence <= 100),
  detection_method VARCHAR(50) DEFAULT 'groq',
  analysis JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Search results table
CREATE TABLE IF NOT EXISTS search_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  query TEXT NOT NULL,
  results JSONB NOT NULL,
  accuracy_score DECIMAL(5, 2) DEFAULT 85,
  source_count INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Analysis history table
CREATE TABLE IF NOT EXISTS analysis_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  detection_id UUID REFERENCES detection_results(id) ON DELETE CASCADE,
  analysis_type VARCHAR(50),
  results JSONB,
  duration_ms INT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Analytics table
CREATE TABLE IF NOT EXISTS analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  metric_type VARCHAR(50) NOT NULL,
  metric_value DECIMAL(10, 2),
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_detection_user_id ON detection_results(user_id);
CREATE INDEX IF NOT EXISTS idx_detection_created_at ON detection_results(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_search_user_id ON search_results(user_id);
CREATE INDEX IF NOT EXISTS idx_search_created_at ON search_results(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analysis_user_id ON analysis_history(user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_user_id ON analytics(user_id);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE detection_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE search_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE analysis_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for users table
CREATE POLICY "Users can view their own data"
  ON users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own data"
  ON users FOR UPDATE
  USING (auth.uid() = id);

-- Create RLS policies for detection_results
CREATE POLICY "Users can view their own detection results"
  ON detection_results FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own detection results"
  ON detection_results FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own detection results"
  ON detection_results FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own detection results"
  ON detection_results FOR DELETE
  USING (auth.uid() = user_id);

-- Create RLS policies for search_results
CREATE POLICY "Users can view their own search results"
  ON search_results FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own search results"
  ON search_results FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for analysis_history
CREATE POLICY "Users can view their own analysis history"
  ON analysis_history FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own analysis history"
  ON analysis_history FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for analytics
CREATE POLICY "Users can view their own analytics"
  ON analytics FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own analytics"
  ON analytics FOR INSERT
  WITH CHECK (auth.uid() = user_id);
