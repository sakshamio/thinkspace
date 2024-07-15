document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.tag-btn');
  const postItems = document.querySelectorAll('.post-item');

  console.log('Filter buttons:', filterButtons.length);
  console.log('Post items:', postItems.length);

  // Show all posts by default
  postItems.forEach(item => item.style.display = '');

  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      const tag = this.getAttribute('data-tag').toLowerCase();
      console.log('Button clicked:', tag);
      
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');

      let visiblePosts = 0;

      postItems.forEach(item => {
        const itemTags = (item.getAttribute('data-tags') || '').toLowerCase();
        console.log('Post item:', item);
        console.log('Post tags:', itemTags);
        console.log('Does post contain tag?', itemTags.includes(tag));
        
        if (tag === 'all' || (itemTags && itemTags.includes(tag))) {
          item.style.display = '';
          visiblePosts++;
          console.log('Post visible');
        } else {
          item.style.display = 'none';
          console.log('Post hidden');
        }
      });

      console.log('Visible posts:', visiblePosts);
    });
  });

  // Log all post tags on page load
  postItems.forEach(item => {
    console.log('Post tags on load:', item.getAttribute('data-tags'));
  });
});
