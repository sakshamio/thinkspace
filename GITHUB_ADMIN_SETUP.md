# GitHub Pages Admin Dashboard Setup

This is a client-side admin dashboard that works directly with GitHub Pages without requiring server infrastructure. It uses the GitHub API to manage your Jekyll blog posts.

## Features

✅ **Pure client-side** - Works with GitHub Pages hosting  
✅ **GitHub API integration** - Direct file operations on your repository  
✅ **Full WYSIWYG editor** - Rich text editing with Quill.js  
✅ **Post management** - Create, edit, and delete blog posts  
✅ **Automatic Jekyll frontmatter** - Generates proper post format  
✅ **Session persistence** - Stays logged in during session  

## Setup Instructions

### 1. Create a GitHub Personal Access Token

1. Go to GitHub → **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
2. Click **"Generate new token (classic)"**
3. Give it a descriptive name like "Blog Admin Dashboard"
4. Select the following permissions:
   - ✅ **repo** (Full control of private repositories)
   - ✅ **public_repo** (Access public repositories)
5. Click **"Generate token"**
6. **Copy the token immediately** (you won't see it again)

### 2. Access the Admin Dashboard

1. Navigate to: `https://your-username.github.io/your-repo-name/admin-github/`
2. Enter your repository information:
   - **Repository Owner**: Your GitHub username
   - **Repository Name**: Your repository name (e.g., "blog" or "username.github.io")
   - **GitHub Personal Access Token**: The token you created above

### 3. Start Managing Posts

Once connected, you can:
- View all existing blog posts
- Create new posts with the rich text editor
- Edit existing posts
- Delete posts
- All changes are committed directly to your repository

## Security Considerations

### ✅ What's Secure
- Token is stored only in browser session storage
- Token is base64 encoded (basic obfuscation)
- No server-side storage required
- Direct GitHub API authentication

### ⚠️ Important Warnings
- **Never share your Personal Access Token**
- **Use only on trusted devices** - Token is stored in browser
- **Log out when finished** - Clears token from browser
- **Consider token expiration** - Set reasonable expiry dates
- **Use public computers carefully** - Clear browser data after use

### 🔐 Best Practices
1. **Set token expiration** - Don't create tokens that never expire
2. **Use minimal permissions** - Only grant repo access
3. **Regular token rotation** - Create new tokens periodically
4. **Monitor repository access** - Check GitHub's security log
5. **Use HTTPS only** - Ensure you're on the HTTPS version of your site

## How It Works

1. **Authentication**: Uses GitHub Personal Access Token for API access
2. **File Operations**: Reads/writes files in your `_posts/` directory via GitHub API
3. **Content Management**: Converts between HTML (editor) and Markdown (Jekyll)
4. **Live Updates**: Changes are immediately committed to your repository
5. **GitHub Pages**: Automatically rebuilds and deploys your site

## Troubleshooting

### Connection Issues
- **Invalid credentials**: Double-check repository owner, name, and token
- **Permission denied**: Ensure token has repo permissions
- **Repository not found**: Verify repository name and owner

### Post Management Issues
- **Can't save posts**: Check token permissions and repository access
- **Formatting issues**: The converter handles basic Markdown; complex formatting may need manual adjustment
- **Missing posts**: Ensure posts are in `_posts/` directory with correct naming

### Token Issues
- **Token expired**: Create a new token and update login
- **Token revoked**: Generate a new token with proper permissions
- **Rate limiting**: GitHub has API rate limits; wait and try again

## File Structure

After setup, the admin dashboard will work with:
- `_posts/YYYY-MM-DD-post-name.md` - Your blog posts
- `admin-github.html` - The admin dashboard interface

## Limitations

1. **Image uploads**: Not supported in this version (GitHub API has file size limits)
2. **Video content**: Not directly supported
3. **Complex formatting**: Some advanced HTML/Markdown may need manual editing
4. **Offline editing**: Requires internet connection for GitHub API access

## Migration from Server Version

If you were using the Node.js server version:
1. You can delete: `admin-server.js`, `package.json`, `.env`, `admin.html`
2. Keep: `admin-github.html` 
3. Use the GitHub Pages compatible URL: `/admin-github/`

## Support

This admin dashboard is designed for GitHub Pages hosting. For issues:
1. Check browser console for error messages
2. Verify GitHub token permissions
3. Ensure repository settings allow API access
4. Test token with GitHub API directly if needed

## Privacy Note

Your GitHub token is stored only in your browser's session storage and is used solely to authenticate with GitHub's API. The token is automatically cleared when you log out or close the browser.