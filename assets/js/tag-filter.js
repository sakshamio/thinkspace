document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.tag-btn');
  const postItems = document.querySelectorAll('.post-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      const tag = this.getAttribute('data-tag');
      
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');

      // Filter posts
      postItems.forEach(item => {
        if (tag === 'all' || item.getAttribute('data-tags').includes(tag)) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
});
