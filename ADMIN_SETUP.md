# Admin Dashboard Setup

This guide will help you set up the password-protected admin dashboard for managing your Jekyll blog posts.

## Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)

## Installation

1. **Install Node.js dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit the `.env` file and set your secure admin password:
   ```
   ADMIN_PASSWORD=your_very_secure_password_here
   ```

3. **Make sure .env is in your .gitignore:**
   The `.env` file should NOT be committed to your repository. Add it to `.gitignore`:
   ```
   .env
   node_modules/
   ```

## Usage

1. **Start the admin server:**
   ```bash
   npm start
   ```
   
   For development with auto-restart:
   ```bash
   npm run dev
   ```

2. **Access the admin dashboard:**
   Open your browser and go to: `http://localhost:3001/admin.html`

3. **Login:**
   Use the password you set in the `.env` file

## Features

### Post Management
- **Create new posts** with full WYSIWYG editor
- **Edit existing posts** with live preview
- **Delete posts** with confirmation
- **Rich text editing** with Quill.js editor
- **Automatic Jekyll frontmatter** generation

### Media Management
- **Upload images and videos** directly through the interface
- **Insert media** into posts with one click
- **Delete unused media files**
- **Preview thumbnails** for all media

### Security
- **Password protection** using environment variables
- **Session management** with automatic logout
- **API authentication** for all operations

## File Structure

- `admin.html` - The admin dashboard interface
- `admin-server.js` - Node.js backend server
- `package.json` - Node.js dependencies
- `.env` - Environment variables (not committed)
- `.env.example` - Example environment file

## Important Security Notes

1. **Never commit your .env file** - It contains your admin password
2. **Use a strong password** - This protects your entire blog administration
3. **Run the admin server locally** - Don't expose it to the internet without additional security measures
4. **Regular backups** - Always backup your _posts directory before making changes

## Troubleshooting

### Server won't start
- Make sure you have Node.js installed
- Run `npm install` to install dependencies
- Check that your `.env` file exists and contains `ADMIN_PASSWORD`

### Can't login
- Verify your password in the `.env` file
- Make sure the admin server is running on port 3001
- Check browser console for error messages

### Posts not saving
- Ensure you have write permissions to the `_posts` directory
- Check that the `_posts` directory exists
- Verify the admin server is running and accessible

### Media upload issues
- Ensure the `assets/images` directory exists and is writable
- Check file size limits (default: no limit, but server dependent)
- Verify supported file types: jpg, jpeg, png, gif, svg, webp, mp4, mov, avi

## Development

To modify or extend the admin dashboard:

1. Frontend changes: Edit `admin.html`
2. Backend changes: Edit `admin-server.js`
3. Restart the server to see backend changes
4. Refresh the browser to see frontend changes

The dashboard uses:
- **Quill.js** for rich text editing
- **Express.js** for the backend API
- **Multer** for file uploads
- **Gray-matter** for Jekyll frontmatter parsing