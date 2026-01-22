# GitHub & Netlify Deployment Walkthrough

This guide explains how to use **GitHub** and **Netlify** together to host your RESEA website. This setup allows for "Continuous Deployment"—every time you save and push your code to GitHub, your website automatically updates.

---

## 1. GitHub: The "Vault" for Your Code
GitHub is where your code is stored and managed. It tracks every change you make, allowing you to go back in time if something breaks.

### Steps to Set Up GitHub:
1.  **Initialize Git:** (I can do this for you) This creates a hidden `.git` folder in your project to track changes.
2.  **Create a Repository:** Go to [GitHub.com](https://github.com) and create a new repository named `resea-website`.
3.  **Connect & Push:** Link your local folder to that GitHub repository and "push" your files there.

**Commands used:**
- `git init`: Initializes the project.
- `git add .`: Preparares all files to be saved.
- `git commit -m "initial commit"`: Saves the current state.
- `git push`: Sends the code to GitHub.

---

## 2. Netlify: The "Stage" for Your Website
Netlify connects to your GitHub repository and serves your website to the world. It handles the "build" process (turning your code into a fast, live site).

### Why use Netlify?
- **Automatic Deploys:** It watches your GitHub. When you push code, Netlify updates the live site in seconds.
- **Custom Domains:** You can easily add a domain like `resea-hillsborough.com`.
- **SSL/HTTPS:** Your site is automatically secured with a lock icon.

### How to Connect Netlify:
1.  Log in to [Netlify.com](https://app.netlify.com/).
2.  Click **"Add new site"** > **"Import an existing project"**.
3.  Select **GitHub** and authorize it.
4.  Choose your `resea-website` repository.
5.  **Build Settings:** Netlify will read your `netlify.toml` file automatically.
    - **Build Command:** `npm run build`
    - **Publish Directory:** `dist`
6.  Click **"Deploy site"**.

---

## 3. The Daily Workflow
Once set up, your workflow looks like this:
1.  **Edit:** Make changes to your HTML/CSS/JS files.
2.  **Save/Commit:** Save your work and "commit" it in Git.
3.  **Push:** Push to GitHub.
4.  **Live:** Netlify sees the push and updates your site automatically!
