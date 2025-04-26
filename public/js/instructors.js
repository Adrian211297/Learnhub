document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/instructors')
      .then(res => res.json())
      .then(instructors => {
        const container = document.getElementById('instructor-list');
  
        instructors.forEach(instructor => {
          const card = document.createElement('div');
          card.className = 'card';
          card.innerHTML = `
            <img src="${instructor.image}" alt="${instructor.name}" class="card-img profile-img">
            <div class="card-body">
              <h3>${instructor.name}</h3>
              <p><strong>Specialization:</strong> ${instructor.specialization}</p>
              <p><strong>Experience:</strong> ${instructor.experience}</p>
              <p>${instructor.bio || ''}</p>
            </div>
          `;
          container.appendChild(card);
        });
      });
  });