# 🚀 Deployment Guide

## GitHub Repository Setup

### 1. Create GitHub Repository

1. Go to [GitHub](https://github.com)
2. Click **"New repository"** or **"+"** → **"New repository"**
3. Name format: `CodingCamp-24August26-[yourname]`
   - Example: `CodingCamp-24August26-yamaroni`
4. Set to **Public**
5. **DO NOT** initialize with README (we already have one)
6. Click **"Create repository"**

### 2. Using GitHub Desktop

#### Initial Setup
1. Open **GitHub Desktop**
2. Go to **File** → **Add Local Repository**
3. Click **"Choose..."** and select your project folder: `C:\Users\PONGO\Documents\camp`
4. If prompted "This directory does not appear to be a Git repository", click **"Create a repository"**

#### Configure Repository
1. Fill in:
   - **Name**: `CodingCamp-24August26-[yourname]`
   - **Local Path**: Should already show your folder path
   - **Git Ignore**: None (we have our own .gitignore)
   - **License**: None
2. Click **"Create Repository"**

#### First Commit
1. In GitHub Desktop, you'll see all your files in the "Changes" tab
2. **IMPORTANT**: Make sure `.kiro` folder is included (required for submission)
3. In the summary field (bottom left), type: `Initial commit - Life Dashboard`
4. Add description (optional): `Complete To-Do List Life Dashboard with all features`
5. Click **"Commit to main"**

#### Publish to GitHub
1. Click **"Publish repository"** button at the top
2. Uncheck **"Keep this code private"** (must be public)
3. Organization: None (unless you have one)
4. Click **"Publish Repository"**

### 3. Deploy to GitHub Pages

#### Method 1: Via GitHub Website
1. Go to your repository on GitHub
2. Click **"Settings"** tab
3. Scroll down and click **"Pages"** in the left sidebar
4. Under **"Source"**, select:
   - Branch: `main`
   - Folder: `/ (root)`
5. Click **"Save"**
6. Wait 1-2 minutes for deployment
7. Your site will be available at: `https://[yourusername].github.io/CodingCamp-24August26-[yourname]/`

#### Method 2: Via GitHub Desktop (Push First)
1. After publishing, go to GitHub website
2. Navigate to your repository
3. Follow steps from Method 1

### 4. Verify Deployment

1. Open the GitHub Pages URL in your browser
2. Check that all features work:
   - ✅ Clock updates in real-time
   - ✅ Greeting changes based on time
   - ✅ Timer starts/stops/resets
   - ✅ Can add/edit/delete tasks
   - ✅ Can add/remove quick links
   - ✅ Theme toggle works
   - ✅ Name saves in greeting
   - ✅ Data persists on page refresh

## 📝 Submission Checklist

Before submitting, ensure you have:

- [ ] GitHub Repository is **PUBLIC**
- [ ] Repository name follows format: `CodingCamp-24August26-[yourname]`
- [ ] **.kiro folder is included** in the repository
- [ ] Code is pushed to GitHub
- [ ] Website is deployed on GitHub Pages
- [ ] All features are working on the deployed site
- [ ] You have your **AWS Builder ID** ready

## 📤 Submit Your Project

When the submission form opens (Wednesday), submit:
1. **AWS Builder ID** - Your Kiro Builder ID
2. **GitHub Repository URL** - `https://github.com/[yourusername]/CodingCamp-24August26-[yourname]`
3. **Deployed Website URL** - `https://[yourusername].github.io/CodingCamp-24August26-[yourname]/`

⚠️ **IMPORTANT**: All three links must be submitted or your submission will NOT be valid.

## 🆘 Troubleshooting

### Repository Not Showing Files
- Make sure you committed all changes in GitHub Desktop
- Click "Push origin" to upload to GitHub

### GitHub Pages Not Working
- Check that repository is PUBLIC
- Verify branch is set to `main` in Pages settings
- Wait 2-3 minutes after enabling Pages
- Check for typos in repository name

### .kiro Folder Not Included
- Make sure `.kiro/` is NOT in your `.gitignore` file
- Check GitHub repository online to verify folder is there
- If missing, remove from .gitignore and commit again

### Changes Not Appearing on Website
- Clear browser cache (Ctrl + F5)
- Wait a few minutes for GitHub Pages to rebuild
- Check GitHub Actions tab for deployment status

## 🎯 Deadline

**Saturday, 11:59 PM WIB**

Good luck! 🚀
