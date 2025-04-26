document.addEventListener('DOMContentLoaded', function() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
      question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const isOpen = answer.style.display === 'block';
        
        // Close all answers first
        document.querySelectorAll('.faq-answer').forEach(ans => {
          ans.style.display = 'none';
        });
        
        // Toggle current answer
        answer.style.display = isOpen ? 'none' : 'block';
        
        // Reset all questions
        faqQuestions.forEach(q => {
          q.style.backgroundColor = '#3498db';
        });
        
        // Highlight current question
        if (!isOpen) {
          question.style.backgroundColor = '#2980b9';
        }
      });
    });
  });