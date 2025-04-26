document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchCourse');
    const courseGrid = document.getElementById('course-grid');
    let allCourses = [];
  
    // Fetch all courses
    fetch('/api/courses')
      .then(res => res.json())
      .then(data => {
        allCourses = data;
        renderCourses(allCourses);
      });
  
    // Handle live search
    searchInput.addEventListener('input', () => {
      const value = searchInput.value.toLowerCase();
      const filtered = allCourses.filter(course =>
        course.name.toLowerCase().includes(value) ||
        course.instructor.toLowerCase().includes(value)
      );
      renderCourses(filtered);
    });
  
    function renderCourses(courses) {
      courseGrid.innerHTML = '';
      courses.forEach(course => {
        const card = document.createElement('div');
        card.className = 'card course-card';
  
        const moreInfoId = `more-info-${Math.random().toString(36).substr(2, 9)}`;
  
        card.innerHTML = `
          <div class="card-body">
            <h3>${course.name}</h3>
            <p class="instructor"><strong>Instructor:</strong> ${course.instructor}</p>
            <p>${course.description || ''}</p>
            <button class="btn toggle-info" data-target="${moreInfoId}">Show More</button>
            <div id="${moreInfoId}" class="more-info" style="display: none; margin-top: 1rem;">
              <p><strong>Duration:</strong> ${course.duration || 'N/A'}</p>
              <p><strong>Requirements:</strong> ${course.requirements || 'None listed'}</p>
              <p><strong>What You Will Learn:</strong> ${course.outcomes || 'Content not available'}</p>
              <p><strong>How to Apply:</strong> ${course.application || 'Please visit the contact page.'}</p>
            </div>
          </div>
        `;
  
        courseGrid.appendChild(card);
      });
  
      // Add toggle functionality
      document.querySelectorAll('.toggle-info').forEach(button => {
        button.addEventListener('click', () => {
          const targetId = button.getAttribute('data-target');
          const targetDiv = document.getElementById(targetId);
          const isVisible = targetDiv.style.display === 'block';
          targetDiv.style.display = isVisible ? 'none' : 'block';
          button.textContent = isVisible ? 'Show More' : 'Show Less';
        });
      });
    }
  });