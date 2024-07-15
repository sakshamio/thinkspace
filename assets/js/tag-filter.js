document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM fully loaded and parsed');
  
  const filterButtons = document.querySelectorAll('.tag-btn');
  const postItems = document.querySelectorAll('.post-item');

  console.log('Filter buttons:', filterButtons.length);
  console.log('Post items:', postItems.length);

  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      const tag = this.getAttribute('data-tag');
      console.log('Button clicked:', tag);
      
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');

      let visiblePosts = 0;

      // Filter posts
      postItems.forEach(item => {
        const itemTags = item.getAttribute('data-tags');
        console.log('Post item:', item);
        console.log('Post tags:', itemTags);
        
        if (tag === 'all') {
          item.style.display = '';
          visiblePosts++;
        } else if (itemTags) {
          const tagArray = itemTags.split(' ');
          console.log('Tag array:', tagArray);
          if (tagArray.includes(tag)) {
            item.style.display = '';
            visiblePosts++;
          } else {
            item.style.display = 'none';
          }
        } else {
          item.style.display = 'none';
        }
      });

      console.log('Visible posts:', visiblePosts);
    });
  });
});
