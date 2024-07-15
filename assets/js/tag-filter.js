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

      // Filter posts
      postItems.forEach(item => {
        const itemTags = item.getAttribute('data-tags');
        console.log('Post item:', item);
        console.log('Post tags:', itemTags);
        
        if (tag === 'all' || (itemTags && itemTags.includes(tag))) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
});
