require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const cors = require('cors');
const matter = require('gray-matter');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname, 'assets', 'images');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const timestamp = Date.now();
        const ext = path.extname(file.originalname);
        const name = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9]/g, '-');
        cb(null, `${timestamp}-${name}${ext}`);
    }
});

const upload = multer({ storage: storage });

// Authentication middleware
const authenticate = (req, res, next) => {
    const password = req.headers.authorization;
    const adminPassword = process.env.ADMIN_PASSWORD;
    
    if (!adminPassword) {
        return res.status(500).json({ error: 'Admin password not configured' });
    }
    
    if (password !== adminPassword) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
};

// Get all posts
app.get('/api/posts', authenticate, (req, res) => {
    try {
        const postsDir = path.join(__dirname, '_posts');
        const files = fs.readdirSync(postsDir).filter(file => file.endsWith('.md'));
        
        const posts = files.map(filename => {
            const filePath = path.join(postsDir, filename);
            const fileContent = fs.readFileSync(filePath, 'utf8');
            const { data, content } = matter(fileContent);
            
            return {
                filename,
                frontMatter: data,
                content: content.trim(),
                title: data.title || filename,
                date: data.date || filename.substring(0, 10),
                description: data.description || '',
                keywords: data.keywords || '',
                tags: data.tags || []
            };
        });
        
        // Sort by date, newest first
        posts.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        res.json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
});

// Get single post
app.get('/api/posts/:filename', authenticate, (req, res) => {
    try {
        const filename = req.params.filename;
        const filePath = path.join(__dirname, '_posts', filename);
        
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: 'Post not found' });
        }
        
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContent);
        
        res.json({
            filename,
            frontMatter: data,
            content: content.trim()
        });
    } catch (error) {
        console.error('Error fetching post:', error);
        res.status(500).json({ error: 'Failed to fetch post' });
    }
});

// Create or update post
app.post('/api/posts', authenticate, (req, res) => {
    try {
        const { title, date, description, keywords, tags, content, filename } = req.body;
        
        // Generate filename if not provided
        const postFilename = filename || `${date}-${title.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '')}.md`;
        const filePath = path.join(__dirname, '_posts', postFilename);
        
        // Create front matter
        const frontMatter = {
            layout: 'post',
            title: title,
            comments: true,
            description: description,
            keywords: keywords,
            tags: tags
        };
        
        // Convert HTML content to Markdown
        const markdownContent = htmlToMarkdown(content);
        
        // Create the complete file content
        const fileContent = matter.stringify(markdownContent, frontMatter);
        
        // Write file
        fs.writeFileSync(filePath, fileContent);
        
        res.json({ 
            success: true, 
            filename: postFilename,
            message: 'Post saved successfully' 
        });
    } catch (error) {
        console.error('Error saving post:', error);
        res.status(500).json({ error: 'Failed to save post' });
    }
});

// Delete post
app.delete('/api/posts/:filename', authenticate, (req, res) => {
    try {
        const filename = req.params.filename;
        const filePath = path.join(__dirname, '_posts', filename);
        
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: 'Post not found' });
        }
        
        fs.unlinkSync(filePath);
        
        res.json({ 
            success: true,
            message: 'Post deleted successfully' 
        });
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ error: 'Failed to delete post' });
    }
});

// Upload media files
app.post('/api/upload', authenticate, upload.array('files'), (req, res) => {
    try {
        const files = req.files.map(file => ({
            filename: file.filename,
            originalName: file.originalname,
            url: `/assets/images/${file.filename}`,
            size: file.size,
            type: file.mimetype
        }));
        
        res.json({ 
            success: true,
            files: files 
        });
    } catch (error) {
        console.error('Error uploading files:', error);
        res.status(500).json({ error: 'Failed to upload files' });
    }
});

// Get media files
app.get('/api/media', authenticate, (req, res) => {
    try {
        const mediaDir = path.join(__dirname, 'assets', 'images');
        
        if (!fs.existsSync(mediaDir)) {
            return res.json([]);
        }
        
        const files = fs.readdirSync(mediaDir).filter(file => {
            const ext = path.extname(file).toLowerCase();
            return ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp', '.mp4', '.mov', '.avi'].includes(ext);
        });
        
        const mediaFiles = files.map(filename => {
            const filePath = path.join(mediaDir, filename);
            const stats = fs.statSync(filePath);
            
            return {
                filename,
                url: `/assets/images/${filename}`,
                size: stats.size,
                modified: stats.mtime,
                type: path.extname(filename).substring(1)
            };
        });
        
        // Sort by modification date, newest first
        mediaFiles.sort((a, b) => new Date(b.modified) - new Date(a.modified));
        
        res.json(mediaFiles);
    } catch (error) {
        console.error('Error fetching media:', error);
        res.status(500).json({ error: 'Failed to fetch media files' });
    }
});

// Delete media file
app.delete('/api/media/:filename', authenticate, (req, res) => {
    try {
        const filename = req.params.filename;
        const filePath = path.join(__dirname, 'assets', 'images', filename);
        
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: 'File not found' });
        }
        
        fs.unlinkSync(filePath);
        
        res.json({ 
            success: true,
            message: 'File deleted successfully' 
        });
    } catch (error) {
        console.error('Error deleting file:', error);
        res.status(500).json({ error: 'Failed to delete file' });
    }
});

// Basic HTML to Markdown conversion
function htmlToMarkdown(html) {
    if (!html) return '';
    
    return html
        .replace(/<h([1-6])>/g, (match, level) => '#'.repeat(parseInt(level)) + ' ')
        .replace(/<\/h[1-6]>/g, '\n\n')
        .replace(/<strong>/g, '**')
        .replace(/<\/strong>/g, '**')
        .replace(/<b>/g, '**')
        .replace(/<\/b>/g, '**')
        .replace(/<em>/g, '_')
        .replace(/<\/em>/g, '_')
        .replace(/<i>/g, '_')
        .replace(/<\/i>/g, '_')
        .replace(/<p>/g, '')
        .replace(/<\/p>/g, '\n\n')
        .replace(/<br\s*\/?>/g, '\n')
        .replace(/<ul>/g, '\n')
        .replace(/<\/ul>/g, '\n')
        .replace(/<ol>/g, '\n')
        .replace(/<\/ol>/g, '\n')
        .replace(/<li>/g, '- ')
        .replace(/<\/li>/g, '\n')
        .replace(/<blockquote>/g, '> ')
        .replace(/<\/blockquote>/g, '\n\n')
        .replace(/<code>/g, '`')
        .replace(/<\/code>/g, '`')
        .replace(/<pre><code>/g, '```\n')
        .replace(/<\/code><\/pre>/g, '\n```\n')
        .replace(/<img[^>]+src="([^"]+)"[^>]*alt="([^"]*)"[^>]*>/g, '![$2]($1)')
        .replace(/<img[^>]+src="([^"]+)"[^>]*>/g, '![]($1)')
        .replace(/<a[^>]+href="([^"]+)"[^>]*>([^<]+)<\/a>/g, '[$2]($1)')
        .replace(/<[^>]+>/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/\n\n\n+/g, '\n\n')
        .trim();
}

// Start server
app.listen(PORT, () => {
    console.log(`Admin server running at http://localhost:${PORT}`);
    console.log(`Access admin dashboard at http://localhost:${PORT}/admin.html`);
});

module.exports = app;